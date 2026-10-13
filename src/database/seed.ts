import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module.js';
import { runSeed } from './seed.runner.js';

const app = await NestFactory.createApplicationContext(AppModule, {
  logger: ['log', 'warn', 'error'],
});

try {
  await runSeed(app.get(DataSource));
} catch (error) {
  Logger.error(
    error instanceof Error ? error.message : 'Unknown error',
    error instanceof Error ? error.stack : undefined,
    'Seed',
  );
  process.exitCode = 1;
} finally {
  await app.close();
}
