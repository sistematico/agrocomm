import Bree from 'bree';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
  defaultExtension: 'ts',
  jobs: [
    {
      name: "scrape",
      cron: "11 12 * * *",
    },
  ],
});

await bree.start();