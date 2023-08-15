import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore = require('connect-mongo');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/session'}),
      cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, secure:false }
    }),
  );
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
