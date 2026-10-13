import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionsController } from './commissions.controller.js';
import { CommissionsService } from './commissions.service.js';
import { CommissionRule } from './entities/commission-rule.entity.js';
import { Sale } from './entities/sale.entity.js';
import { Seller } from './entities/seller.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Seller, Sale, CommissionRule])],
  controllers: [CommissionsController],
  providers: [CommissionsService],
})
export class CommissionsModule {}
