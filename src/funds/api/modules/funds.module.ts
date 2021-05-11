import { Module } from '@nestjs/common';
import {IFundsServiceProvider} from "../../core/primary-ports/funds.service.interface";
import {FundsService} from '../../core/services/fundsService';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FundsGateway} from '../gateways/fundsGateway';
import {Funds} from '../../infrastructure/entities/funds';


@Module({
    imports: [TypeOrmModule.forFeature([Funds])],
    providers: [
        FundsGateway,
        {
            provide: IFundsServiceProvider,
            useClass: FundsService,
        },
    ],
})
export class FundsModule {}
