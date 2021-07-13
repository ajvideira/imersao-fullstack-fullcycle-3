import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { KafkaCreateInvoiceDto } from './dto/create-invoice.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('/credit-cards/:creditCardNumber/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern('payments')
  create(
    @Payload(new ValidationPipe()) kafkaCreateInvoiceDto: KafkaCreateInvoiceDto,
  ) {
    return this.invoicesService.create(kafkaCreateInvoiceDto.value);
  }

  @Get()
  findAll(@Param('creditCardNumber') creditCardNumber: string) {
    return this.invoicesService.findAll(creditCardNumber);
  }
}
