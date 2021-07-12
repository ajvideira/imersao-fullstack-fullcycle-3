import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { PaymentService } from './payment/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private paymentService: PaymentService,
    private connection: Connection,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    const products = await this.productRepository.find({
      where: {
        id: In(order.items.map((item) => item.product_id)),
      },
    });
    order.items.forEach((item) => {
      item.price = products.find(
        (product) => product.id === item.product_id,
      ).price;
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newOrder = await queryRunner.manager.save(order);
      await this.paymentService.payment({
        creditCard: {
          name: newOrder.credit_card.name,
          number: newOrder.credit_card.number,
          cvv: newOrder.credit_card.cvv,
          expirationMonth: newOrder.credit_card.expiration_month,
          expirationYear: newOrder.credit_card.expiration_year,
        },
        amount: newOrder.total,
        store: process.env.STORE_NAME,
        description: `Produtos: ${products.map((p) => p.name).join(', ')}`,
      });

      await queryRunner.manager.update(
        Order,
        { id: newOrder.id },
        { status: OrderStatus.Approved },
      );

      queryRunner.commitTransaction();

      return this.orderRepository.findOne(newOrder.id, {
        relations: ['items'],
      });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOneOrFail(id, {
      relations: ['items', 'items.product'],
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
