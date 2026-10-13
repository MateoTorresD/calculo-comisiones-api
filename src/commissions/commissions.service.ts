import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommissionRule } from './entities/commission-rule.entity.js';
import { Sale } from './entities/sale.entity.js';
import { Seller } from './entities/seller.entity.js';
import type { CommissionsResponse } from './interfaces/commissions-response.interface.js';
import type { SellerCommission } from './interfaces/seller-commission.interface.js';
import type { SellerTotal } from './interfaces/seller-total.interface.js';

@Injectable()
export class CommissionsService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellers: Repository<Seller>,
    @InjectRepository(CommissionRule)
    private readonly rules: Repository<CommissionRule>,
  ) {}

  async calculate(
    startDate: string,
    endDate: string,
  ): Promise<CommissionsResponse> {
    if (startDate > endDate) {
      throw new BadRequestException(
        'startDate no puede ser posterior a endDate',
      );
    }

    const [totals, rules] = await Promise.all([
      this.totalsBySeller(startDate, endDate),
      this.rules.find(),
    ]);

    return {
      startDate,
      endDate,
      results: this.calculateCommissions(totals, rules),
    };
  }

  private totalsBySeller(
    startDate: string,
    endDate: string,
  ): Promise<SellerTotal[]> {
    return this.sellers
      .createQueryBuilder('seller')
      .leftJoin(
        Sale,
        'sale',
        'sale.sellerId = seller.id AND sale.date BETWEEN :startDate AND :endDate',
        { startDate, endDate },
      )
      .select('seller.id', 'sellerId')
      .addSelect('seller.name', 'sellerName')
      .addSelect('COALESCE(SUM(sale.amount), 0)', 'total')
      .groupBy('seller.id')
      .addGroupBy('seller.name')
      .getRawMany<SellerTotal>();
  }


  private calculateCommissions(
    totals: SellerTotal[],
    rules: CommissionRule[],
  ): SellerCommission[] {
    const sortedRules = [...rules].sort((a, b) => b.minAmount - a.minAmount);

    return totals
      .map(({ sellerId, sellerName, total }) => {
        const totalSales = Number(total);
        const rule = sortedRules.find((r) => totalSales >= r.minAmount);
        const percentage = rule?.percentage ?? 0;

        return {
          sellerId,
          sellerName,
          totalSales,
          commissionPercentage: Number((percentage * 100).toFixed(2)),
          commission: Number((totalSales * percentage).toFixed(2)),
        };
      })
      .sort((a, b) => a.sellerId - b.sellerId);
  }
}
