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
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongoUrl: process.env.SESSION_STORE_URL}),
      cookie: { maxAge: 1000000000, secure:false }
    }),
  );
  app.enableCors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
