import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreditCard } from './entities/credit-card.entity';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    console.log(createInvoiceDto);

    const { credit_card_number, ...data } = createInvoiceDto;

    const creditCard = await this.creditCardRepository.findOneOrFail({
      where: {
        number: credit_card_number,
      },
    });

    const invoice = this.invoiceRepository.create({
      ...data,
      credit_card_id: creditCard.id,
    });
    return this.invoiceRepository.save(invoice);
  }

  findAll() {
    return this.invoiceRepository.find();
  }
}
