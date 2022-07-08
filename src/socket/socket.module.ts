import { Module } from '@nestjs/common';
import { SocketTestGateway } from './socket.gateway';


@Module({
  providers: [SocketTestGateway],
})
export class SocketModule {}