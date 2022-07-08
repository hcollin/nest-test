import { Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService, private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('obi')
  getReply(@Req() request: Request, @Session() session: any) {
    console.log("All params", request.query);
    console.log("Session", request.session, request.sessionID);
    return {
      data: "Hello There!"
    };
  }

  @Get('name')
  getName(): string {
    return this.appService.getName();
  }

  @Get('slow')
  async slow(): Promise<number> {

    const rndNum = Math.round(Math.random() * 5);


    return rndNum;
  }


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
      return this.authService.login(req.user);
  }



  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }


}
