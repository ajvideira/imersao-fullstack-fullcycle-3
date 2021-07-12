import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product]),
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_PACKAGE',
        useFactory: () => ({
          transport: Transport.GRPC,
          options: {
            url: process.env.GRPC_HOST,
            package: 'payment',
            protoPath: join(__dirname, 'proto/payment.proto'),
          },
        }),
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentService],
})
export class OrdersModule {}
