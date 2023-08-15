import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { AppController } from './app.controller';
import { UserService } from './service/user/user.service';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://localhost:27017/monitor',
    }),
  }), 
  UserModule],
})
export class AppModule {}