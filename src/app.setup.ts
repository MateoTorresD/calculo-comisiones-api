import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function configureApp(app: INestApplication): void {
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: config
      .get<string>('FRONTEND_URL', 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim().replace(/\/$/, '')),
    methods: ['GET'],
  });
  app.enableShutdownHooks();
}
