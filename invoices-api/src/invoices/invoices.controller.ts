import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import {
  CreateInvoiceDto,
  KafkaCreateInvoiceDto,
} from './dto/create-invoice.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern('payments')
  create(
    @Payload(new ValidationPipe()) kafkaCreateInvoiceDto: KafkaCreateInvoiceDto,
  ) {
    return this.invoicesService.create(kafkaCreateInvoiceDto.value);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }
}
