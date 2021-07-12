import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

interface PaymentGrpcService {
  payment(data: PaymentData): Observable<void>;
}

interface PaymentData {
  creditCard: {
    number: string;
    name: string;
    cvv: string;
    expirationMonth: number;
    expirationYear: number;
  };
  amount: number;
  description: string;
  store: string;
}

@Injectable()
export class PaymentService implements OnModuleInit {
  private paymentGrpcService: PaymentGrpcService;

  constructor(@Inject('PAYMENT_PACKAGE') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.paymentGrpcService =
      this.clientGrpc.getService<PaymentGrpcService>('PaymentService');
  }

  async payment(data: PaymentData) {
    try {
      return await firstValueFrom(this.paymentGrpcService.payment(data));
    } catch (e) {
      throw new RpcException({
        code: e.code,
        message: e.message,
      });
    }
  }
}
