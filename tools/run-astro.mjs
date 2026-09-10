import { spawnSync } from 'node:child_process';

const command = process.argv[2];
const forwarded = process.argv.slice(3);

if (!command) {
  console.error('Не указана команда Astro.');
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  ['./node_modules/astro/bin/astro.mjs', command, ...forwarded],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: '1'
    },
    stdio: 'inherit'
  }
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
