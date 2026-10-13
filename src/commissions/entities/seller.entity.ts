import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sellers' })
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;
}
