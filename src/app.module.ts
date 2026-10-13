import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommissionsModule } from './commissions/commissions.module.js';
import { HealthController } from './health/health.controller.js';

function resolveSsl(mode: string): boolean | { rejectUnauthorized: boolean } {
  if (mode === 'true') return true;
  if (mode === 'no-verify') return { rejectUnauthorized: false };
  return false;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        ssl: resolveSsl(config.get<string>('DB_SSL', 'false')),
        autoLoadEntities: true,
        synchronize: false,
        logging: ['error', 'warn'],
      }),
    }),
    CommissionsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
