import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Express } from 'express';
import { AppModule } from './app.module';

let cachedServer: Server;

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: false,
    },
  );

  app.useLogger(app.get(Logger));

  return app;
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return createServer(expressApp);
}

export default async function handler(
  event: any,
  context: Context,
): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
