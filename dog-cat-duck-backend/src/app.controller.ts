import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, ImagesResponse, FavouritesResponse, TagsResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRandomImages(): ImagesResponse {
    return this.appService.getRandomImages();
  }

  @Get("/tags")
  getTags(): TagsResponse {
    return this.appService.getTags();
  }

  @Get("/search/:tag")
  getImagesByTag(@Param() params): ImagesResponse {
    return this.appService.getImagesByTag(params.tag);
  }

  @Post("/favourite/:image_id")
  setFavourite(@Param() params): FavouritesResponse {
    return this.appService.setFavourite(params.image_id);
  }

  @Get("/favourites/")
  getFavouriteImages(@Param() params): ImagesResponse {
    return this.appService.getFavouriteImages();
  }
}
