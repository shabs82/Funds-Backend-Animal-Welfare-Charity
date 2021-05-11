import {
    ConnectedSocket,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {
    IFundsService,
    IFundsServiceProvider,
} from '../../core/primary-ports/funds.service.interface';
import { Inject } from '@nestjs/common';
import { Socket } from 'socket.io';


@WebSocketGateway()

export class FundsGateway{
    constructor(
        @Inject(IFundsServiceProvider) private fundsService: IFundsService,
    ) {}
    @WebSocketServer() server;
    @SubscribeMessage('funds')
    async handleEvent(@ConnectedSocket() client: Socket): Promise<void>  {
        try {
            const funds = await this.fundsService.getTotalFunds();
            this.server.emit('funds', funds);
        } catch (e) {
            client.error(e.message);
        }
    }


}
