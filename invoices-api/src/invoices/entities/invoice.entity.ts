import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CreditCard } from './credit-card.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  payment_date: Date;

  @Column()
  credit_card_id: string;

  @ManyToOne(() => CreditCard)
  @JoinColumn({ name: 'credit_card_id' })
  credit_card: CreditCard;

  @Column()
  transaction_id: string;

  @Column()
  store: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generatedId() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
