import {IFundsService} from "../primary-ports/funds.service.interface";
import {Injectable} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funds} from '../../infrastructure/entities/funds';
import {FundModels} from "../models/models";


@Injectable()
export class FundsService implements IFundsService {
    constructor(
        @InjectRepository(Funds)
        private fundsRepository: Repository<Funds>,
    ) {
    }

  /*  async addFunds(id: number, charityName: string, totalIncome: number,
                   email: string, website: string, telNumber: number): Promise<Funds> {
        let funds = this.fundsRepository.create();
        funds.id = id;
        funds.charityName = charityName;
        funds.totalIncome = totalIncome;
        funds.email = email;
        funds.website = website;

    }*/

    async getTotalFunds(): Promise<Funds[]> {
        const funds = await this.fundsRepository.find();
        const fundModels: FundModels[] = JSON.parse(JSON.stringify(funds));
        return funds;
    }
}

