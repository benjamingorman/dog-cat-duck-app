import { Injectable } from '@nestjs/common';
import { ImageMetadata, getRandomImages, getImagesByTag, setFavourite, getTags, getFavouriteImages} from "./database";


export type ImagesResponse = {
  images: Array<ImageMetadata>;
}


export type FavouritesResponse = {
  success: boolean;
  reason?: string;
}

export type TagsResponse = Record<string, number>;


@Injectable()
export class AppService {
  getImagesByTag(tag: string): ImagesResponse {
    return {"images": getImagesByTag(tag)}
  }

  getRandomImages(quantity: number = 5): ImagesResponse {
    return {"images": getRandomImages(quantity)}
  }

  setFavourite(image_id: string): FavouritesResponse {
    console.log("setFavourite", image_id);
    try {
      setFavourite(image_id)
      return {"success": true}
    } catch(exc) {
      console.warn(exc.message);
      return {"success": false, "reason": exc.message}
    }
  }

  getFavouriteImages(): ImagesResponse {
    return {"images": getFavouriteImages()};
  }

  getTags(): TagsResponse {
    return getTags();
  }
}
