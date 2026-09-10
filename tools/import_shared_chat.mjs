import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "chat-history");
const sourcePath = path.join(outputDir, "chatgpt-share-source.html");
const shareUrl = "https://chatgpt.com/share/6aa26b99-927c-83ed-b0a0-1e03be7f614f";

function decodeDevalue(values) {
  const cache = new Map();

  function decodeIndex(index) {
    if (index < 0) return null;
    if (cache.has(index)) return cache.get(index);

    const raw = values[index];
    if (raw === null || typeof raw !== "object") return raw;

    if (Array.isArray(raw)) {
      const result = [];
      cache.set(index, result);
      for (const valueIndex of raw) result.push(decodeIndex(valueIndex));
      return result;
    }

    const result = {};
    cache.set(index, result);
    for (const [encodedKey, valueIndex] of Object.entries(raw)) {
      const keyIndex = Number(encodedKey.startsWith("_") ? encodedKey.slice(1) : encodedKey);
      const key = Number.isInteger(keyIndex) ? decodeIndex(keyIndex) : encodedKey;
      result[key] = decodeIndex(valueIndex);
    }
    return result;
  }

  return decodeIndex(0);
}

function extractConversation(html) {
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  const streamScript = scripts.find((script) => script.includes('streamController.enqueue("[{'));
  if (!streamScript) throw new Error("Serialized shared-conversation payload was not found");

  const call = streamScript.match(/enqueue\((.*)\);$/s);
  if (!call) throw new Error("Serialized shared-conversation call could not be parsed");

  const streamText = JSON.parse(call[1]);
  const values = JSON.parse(streamText.split("\n")[0]);
  const decoded = decodeDevalue(values);
  return decoded.loaderData["routes/share.$shareId.($action)"].serverResponse.data;
}

function messageText(message) {
  const parts = message?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts.filter((part) => typeof part === "string").join("\n").trim();
}

function collectObjects(value, target = []) {
  if (!value || typeof value !== "object") return target;
  if (Array.isArray(value)) {
    for (const item of value) collectObjects(item, target);
    return target;
  }
  target.push(value);
  for (const item of Object.values(value)) collectObjects(item, target);
  return target;
}

function collectAssetReferences(conversation) {
  const records = [];
  for (const entry of conversation.linear_conversation ?? []) {
    const message = entry.message ?? entry;
    const role = message?.author?.role ?? null;
    const messageId = message?.id ?? null;
    const objects = collectObjects({ content: message?.content, metadata: message?.metadata });
    for (const object of objects) {
      const pointer = object.asset_pointer ?? object.image_asset_pointer ?? null;
      const fileId = object.id?.startsWith?.("file_") ? object.id : null;
      if (!pointer && !fileId) continue;
      records.push({
        messageId,
        role,
        fileId,
        assetPointer: pointer,
        name: object.name ?? object.filename ?? null,
        mimeType: object.mime_type ?? object.mimeType ?? null,
        size: object.size ?? object.size_bytes ?? null,
        width: object.width ?? null,
        height: object.height ?? null,
      });
    }
  }

  const unique = new Map();
  for (const record of records) {
    const key = [record.fileId, record.assetPointer, record.name, record.messageId].join("|");
    if (!unique.has(key)) unique.set(key, record);
  }
  return [...unique.values()];
}

function buildTranscript(conversation) {
  const lines = [
    "# Переписка ChatGPT: «Сайт СПК»",
    "",
    `Источник: ${shareUrl}`,
    "",
    "Сохранены пользовательские сообщения и видимые текстовые ответы ассистента. Служебные размышления, вызовы инструментов и скрытые системные сообщения не включены в читаемую версию; полный технический снимок публичной беседы находится в `conversation.json`, исходная страница — в `chatgpt-share-source.html`.",
    "",
  ];

  let number = 0;
  for (const entry of conversation.linear_conversation ?? []) {
    const message = entry.message ?? entry;
    const role = message?.author?.role;
    const contentType = message?.content?.content_type;
    const text = messageText(message);
    const hidden = message?.metadata?.is_visually_hidden_from_conversation === true;

    if (hidden || !["user", "assistant"].includes(role)) continue;
    if (!["text", "multimodal_text"].includes(contentType)) continue;
    if (!text || text === "Original custom instructions no longer available") continue;

    number += 1;
    lines.push(`## ${number}. ${role === "user" ? "Пользователь" : "ChatGPT"}`);
    lines.push("");
    lines.push(text);
    lines.push("");
  }
  return `${lines.join("\n").trim()}\n`;
}

const html = fs.readFileSync(sourcePath, "utf8");
const conversation = extractConversation(html);
const visibleMessages = (conversation.linear_conversation ?? [])
  .map((entry) => entry.message ?? entry)
  .filter((message) => ["user", "assistant"].includes(message?.author?.role))
  .map((message) => messageText(message))
  .filter(Boolean)
  .join("\n");
const sandboxPaths = [...new Set(
  [...visibleMessages.matchAll(/sandbox:\/mnt\/data\/([^\s)]+)/g)].map((match) => match[1]),
)].sort();

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "conversation.json"), `${JSON.stringify(conversation, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputDir, "CHAT_TRANSCRIPT.md"), buildTranscript(conversation), "utf8");
fs.writeFileSync(path.join(outputDir, "sandbox-files.txt"), `${sandboxPaths.join("\n")}\n`, "utf8");
fs.writeFileSync(
  path.join(outputDir, "asset-references.json"),
  `${JSON.stringify(collectAssetReferences(conversation), null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({
  title: conversation.title,
  visibleTranscriptPath: path.join(outputDir, "CHAT_TRANSCRIPT.md"),
  conversationJsonPath: path.join(outputDir, "conversation.json"),
  sandboxFileCount: sandboxPaths.length,
  assetReferenceCount: collectAssetReferences(conversation).length,
}, null, 2));
