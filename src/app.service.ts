import { Injectable } from '@nestjs/common';
import { arnd } from 'rndlib';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World Again!';
  }

  getName(): string {
    
    return arnd(["Anakin", "Obi-One", "Luke", "Leia", "Han"]);
  }
}
