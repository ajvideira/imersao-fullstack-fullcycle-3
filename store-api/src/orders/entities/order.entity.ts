import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CreditCard } from './credit-card.embbeded.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Approved = 'approved',
  Pending = 'pending',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column()
  status: OrderStatus = OrderStatus.Pending;

  @Column(() => CreditCard, { prefix: '' })
  credit_card: CreditCard;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotal() {
    return (this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ));
  }
}
