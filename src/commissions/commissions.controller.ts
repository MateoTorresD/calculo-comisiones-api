import { Controller, Get, Query } from '@nestjs/common';
import { CommissionsService } from './commissions.service.js';
import type { CommissionsResponse } from './interfaces/commissions-response.interface.js';
import { GetCommissionsQueryDto } from './dto/get-commissions-query.dto.js';

@Controller('commissions')
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Get()
  getCommissions(
    @Query() query: GetCommissionsQueryDto,
  ): Promise<CommissionsResponse> {
    return this.commissionsService.calculate(query.startDate, query.endDate);
  }
}
