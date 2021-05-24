import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  IFundsService,
  IFundsServiceProvider,
} from '../../core/primary-ports/funds.service.interface';
import { Inject } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UpdateMoneyDto } from '../dtos/update-money.dto';

@WebSocketGateway()
export class FundsGateway {
  constructor(
    @Inject(IFundsServiceProvider) private fundsService: IFundsService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('allFundsFromCharity')
  async handleAllFundsEvent(@ConnectedSocket() client: Socket): Promise<void> {
    try {
      const funds = await this.fundsService.getTotalFunds();
      client.emit('allFunds', funds);
    } catch (e) {
      client.error(e.message);
    }
  }
  @SubscribeMessage('getCharityName')
  async handleCharityNameEvent(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const charityName = await this.fundsService.getFundsByCharityName(
      'charityName',
    );
    client.emit('charityName', charityName);
  }

  @SubscribeMessage('donationAmount')
  async handleDonationAmountEvent(
    @MessageBody() dto: UpdateMoneyDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.fundsService.updateDonationAmount(dto.id, dto.donationAmount);
    const funds = await this.fundsService.getTotalFunds();
    this.server.emit('allFunds', funds);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
  }

  async handleDisconnect(client: Socket, ...args: any): Promise<any> {
    console.log('Client Disconnect', client.id);
  }
}
