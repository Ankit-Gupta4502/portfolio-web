import * as migration_20261023_011341_init from './20261023_011341_init';

export const migrations = [
  {
    up: migration_20261023_011341_init.up,
    down: migration_20261023_011341_init.down,
    name: '20261023_011341_init'
  },
];
