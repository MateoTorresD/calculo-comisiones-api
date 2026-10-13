import { Logger } from '@nestjs/common';
import type { DataSource } from 'typeorm';
import { CommissionRule } from '../commissions/entities/commission-rule.entity.js';
import { Sale } from '../commissions/entities/sale.entity.js';
import { Seller } from '../commissions/entities/seller.entity.js';
import { RULES, SALES, SELLERS } from './seed.data.js';

/**
 * Creates the schema and loads the sample data. Idempotent:
 * - rules and sellers are upserted by their unique key;
 * - sales are only inserted if the table is empty (never deletes data).
 *
 * `synchronize()` only creates/adjusts tables from the entities: fine for
 * this exercise; a real system would use migrations.
 */
export async function runSeed(
  dataSource: DataSource,
  logger: Pick<Logger, 'log'> = new Logger('Seed'),
): Promise<void> {
  await dataSource.synchronize();

  await dataSource.transaction(async (manager) => {
    await manager.upsert(CommissionRule, [...RULES], ['minAmount']);
    await manager.upsert(
      Seller,
      SELLERS.map((name) => ({ name })),
      ['name'],
    );

    if ((await manager.count(Sale)) > 0) {
      logger.log('Sales already exist: skipping sample sales');
      return;
    }

    const sellers = await manager.find(Seller);
    const idByName = new Map(sellers.map((seller) => [seller.name, seller.id]));

    const sales = SALES.map((sale) => {
      const sellerId = idByName.get(sale.seller);
      if (sellerId === undefined) {
        throw new Error(`Seller not found in seed: ${sale.seller}`);
      }
      return { date: sale.date, amount: sale.amount, sellerId };
    });
    await manager.insert(Sale, sales);
    logger.log(`Inserted ${sales.length} sample sales`);
  });

  logger.log('Seed completed');
}
