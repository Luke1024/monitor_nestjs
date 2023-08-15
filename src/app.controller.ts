/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { Session } from '@nestjs/common/decorators';
import { StringDto } from './model/dto/string-dto';
import { ContactDto } from './model/dto/contact-dto';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


@Controller('input')
export class AppController {

  constructor(private userService: UserService) {}
//
  @Get('auth')
  async ping(
    @Session() session: Record<string,any>,
    @Req() request: Request, 
    @Res({ passthrough: true }) response: Response) {
      this.userService.createUserIfDontExist(session);
    return true;
  }

  @Post('contact')
  async saveUserContact(
    @Body() contactDto: ContactDto,
    @Session() session: Record<string, any>,
  ): Promise<boolean> {
    await this.userService.saveUserContact(contactDto, session);
    return true;
  }
}
