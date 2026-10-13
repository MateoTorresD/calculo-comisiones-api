import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { numericTransformer } from '../../common/numeric.transformer.js';
import { Seller } from './seller.entity.js';

@Entity({ name: 'sales' })
@Index('idx_sales_seller_date', ['sellerId', 'date'])
@Check('ck_sales_amount_positive', '"amount" > 0')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: numericTransformer,
  })
  amount: number;

  @Column({ name: 'seller_id', type: 'int' })
  sellerId: number;

  @ManyToOne(() => Seller, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;
}
