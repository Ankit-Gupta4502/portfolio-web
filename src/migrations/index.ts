import * as migration_20261023_011341_init from './20261023_011341_init';
import * as migration_20261028_060222_add_blob_object_key from './20261028_060222_add_blob_object_key';

export const migrations = [
  {
    up: migration_20261023_011341_init.up,
    down: migration_20261023_011341_init.down,
    name: '20261023_011341_init',
  },
  {
    up: migration_20261028_060222_add_blob_object_key.up,
    down: migration_20261028_060222_add_blob_object_key.down,
    name: '20261028_060222_add_blob_object_key'
  },
];
