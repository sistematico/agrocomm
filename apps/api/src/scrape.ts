import { db } from '../db/index'
import * as schema from '../db/schema'

const delay = Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000;

Bun.sleep(delay)

await db.insert(schema.movies).values([
  {
    title: 'The Matrix',
    releaseYear: 1999,
  },
  {
    title: 'The Matrix Reloaded',
    releaseYear: 2003,
  },
  {
    title: 'The Matrix Revolutions',
    releaseYear: 2003,
  },
]);

console.log(`Seeding complete.`);