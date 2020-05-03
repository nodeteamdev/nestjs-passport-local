import * as exphbs from 'express-handlebars';
import * as mongo from 'connect-mongo';
import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import flash = require('connect-flash');

const MongoStore: mongo.MongoStoreFactory = mongo(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const viewsPath = join(__dirname, '../public/views');
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(
    session({
      secret: 'bebetter',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        url: 'mongodb://localhost/bebetter',
        autoReconnect: true,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
