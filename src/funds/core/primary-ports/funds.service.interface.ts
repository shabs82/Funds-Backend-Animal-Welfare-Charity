import { Funds } from '../../infrastructure/entities/funds';

export const IFundsServiceProvider = 'IFundsServiceProvider';
export interface IFundsService {
  getTotalFunds(): Promise<Funds[]>;

  getFundsByCharityName(charityName: string): Promise<void>;

  updateDonationAmount(id: number, donationAmount: number): Promise<Funds>;
}
