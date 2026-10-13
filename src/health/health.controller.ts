import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  /** Simple liveness check (does not touch the DB) for Render's health check. */
  @Get()
  check(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
