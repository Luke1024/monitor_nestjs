/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { Session } from '@nestjs/common/decorators';
import { ContactDto } from './model/dto/contact-dto';
import { Request, Response } from 'express';

@Controller('input')
export class AppController {

  constructor(private userService: UserService) {}

  @Get('auth')
  async auth(
    @Session() session: Record<string,any>,
    @Req() request: Request, 
    @Res({ passthrough: true }) response: Response) {
      try {
        this.userService.createUserIfDontExist(session);
        return true;
      } catch (error) {
        console.error('Error with user auth ' + error);
        return false;
      }
    }

  @Post('contact')
  async saveUserContact(
    @Body() contactDto: ContactDto,
    @Session() session: Record<string, any>,
  ): Promise<boolean> {
    try {
      this.userService.saveUserContact(contactDto, session);
      return true;
    } catch (error) {
      console.error(`Error saving user contact: ${error}`);
      return false;
    }
  }
}
