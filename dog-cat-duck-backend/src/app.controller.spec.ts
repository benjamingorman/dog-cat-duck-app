import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getRandomImages', () => {
    it('should return some results', () => {
      const response = appController.getRandomImages();
      expect(response).toHaveProperty('images');
      console.log(response);
      expect(response.images.length).toBeGreaterThan(0);
    });
  });

  describe('getImagesByTag', () => {
    it('should return some results', () => {
      const response = appController.getImagesByTag({tag: "cat"});
      expect(response).toHaveProperty('images');
      console.log(response);
      expect(response.images.length).toBeGreaterThan(0);
    });
  });

  describe('setFavourite', () => {
    it('should set an image as a favourite', () => {
      const response = appController.setFavourite({image_id: "c01"});
      expect(response.success).toBeTruthy();
    });
  });

  describe('getTags', () => {
    it('should return a sensible response', () => {
      const response = appController.getTags();
      expect(response).toHaveProperty("cat");
      expect(response.cat).toBeGreaterThan(0);
    });
  });
});
