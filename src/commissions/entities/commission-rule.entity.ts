import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { numericTransformer } from '../../common/numeric.transformer.js';

@Entity({ name: 'commission_rules' })
@Check(
  'ck_commission_rules_percentage_range',
  '"percentage" >= 0 AND "percentage" <= 1',
)
@Check('ck_commission_rules_min_amount', '"min_amount" >= 0')
export class CommissionRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'min_amount',
    type: 'numeric',
    precision: 12,
    scale: 2,
    unique: true,
    transformer: numericTransformer,
  })
  minAmount: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 4,
    transformer: numericTransformer,
  })
  percentage: number;
}
