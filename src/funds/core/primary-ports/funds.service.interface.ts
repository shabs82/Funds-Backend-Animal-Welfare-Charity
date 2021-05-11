import {Funds} from '../../infrastructure/entities/funds';

export const IFundsServiceProvider = 'IFundsServiceProvider';
export  interface IFundsService {
   /* addFunds(id: number, charityName: string, totalIncome: number,
             email: string,website: string, telNumber: number): Promise<Funds>;*/
    getTotalFunds(): Promise<Funds[]>;
}
