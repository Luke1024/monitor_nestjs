import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.DATABASE_URL,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
  }), 
  UserModule],
})
export class AppModule {
}