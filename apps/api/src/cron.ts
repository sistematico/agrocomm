import Bree from 'bree';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const min = 0
const max = 0
const minutes = Math.floor(Math.random() * (max - min + 1) + min)

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
  defaultExtension: 'ts',
  jobs: [
    {
      name: "scrape",
      cron: minutes + " 12 * * 1-5", // seg-sex, 12:??pm
    },
  ],
});

await bree.start();