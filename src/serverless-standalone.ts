import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { ContextIdFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { AppService } from './app.service';

let app: INestApplicationContext;

/**
 * Re-use the application context across function invocations
 */
async function bootstrap(): Promise<INestApplicationContext> {
  if (!app) {
    app = await NestFactory.createApplicationContext(AppModule, {
      // if a custom logger is supposed to be used, disable the default logger here
      logger: false,
    });
    // And in this case attach a custom logger
    app.useLogger(app.get(Logger));
  }

  return app;
}

export default async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  /**
   * Setup the application context
   */
  const instance = await bootstrap();
  /**
   * Instantiate a request-scoped DI sub-tree and obtain the request-scoped top-level injectable
   */
  const contextId = ContextIdFactory.create();
  instance.registerRequestByContextId({ context }, contextId);
  const service = await instance.resolve<AppService>(AppService, contextId);

  /**
   * Finally, do something with the event we received
   */
  const result = service.getHello(/* pass event.body here */);

  // Return the computed result
  return { statusCode: 200, body: result };
}
