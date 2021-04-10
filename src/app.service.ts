import { Logger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.log({ msg: 'printing Hello World...' });

    return 'Hello, World!!!!!';
  }
}
