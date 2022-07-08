import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';
import { ChatModule } from './chat/chat.module';
;

@Module({
  imports: [SocketModule, ChatModule, AuthModule, UsersModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
