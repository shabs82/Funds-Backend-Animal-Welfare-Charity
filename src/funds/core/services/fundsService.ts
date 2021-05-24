import { IFundsService } from '../primary-ports/funds.service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funds } from '../../infrastructure/entities/funds';
import { FundModels } from '../models/models';

@Injectable()
export class FundsService implements IFundsService {
  constructor(
    @InjectRepository(Funds)
    private fundsRepository: Repository<Funds>,
  ) {}

  async getTotalFunds(): Promise<Funds[]> {
    const funds = await this.fundsRepository.find();
    const fundModels: FundModels[] = JSON.parse(JSON.stringify(funds));
    return funds;
  }
  async getFundsByCharityName(charityName: string): Promise<void> {
    await this.fundsRepository.findOne({ charityName: charityName });
  }

  async updateDonationAmount(
    id: number,
    donationAmount: number,
  ): Promise<Funds> {
    const update = { totalIncome: donationAmount };
    const updatedFund = await this.fundsRepository.update(id, update);
    return undefined;
  }
}
