import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  create(createCreditCardDto: CreateCreditCardDto) {
    const creditCard = this.creditCardRepository.create(createCreditCardDto);
    return this.creditCardRepository.save(creditCard);
  }

  findAll() {
    return this.creditCardRepository.find();
  }

  findOne(id: string) {
    return this.creditCardRepository.findOneOrFail(id);
  }
}
