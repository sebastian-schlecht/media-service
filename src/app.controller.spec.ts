import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello, World!');
    });

    it('should call the app service', () => {
      jest.spyOn(appService, 'getHello').mockImplementationOnce(() => 'foo');

      appController.getHello();

      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });
  });
});
