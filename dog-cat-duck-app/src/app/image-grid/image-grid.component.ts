import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService, ImagesResponse, ImageMetadata, getImageURL, FavouritesResponse } from '../api-service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent {
  images: Array<ImageMetadata> = [];
  searchTag?: string;

  getImageURL = getImageURL;

  constructor(
    private api_service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadRandomImages();

    this.route.params.subscribe((params: any) => {
      console.log("route changed", params, this.router.url);
      if (this.router.url.startsWith("/tag/") && params.tagName) {
        this.setSearchTag(<string>params.tagName);
      } else if (this.router.url.startsWith("/favourites")) {
        this.loadFavouriteImages();
      }
    })
  }

  /* Set the tag to search for. Only images with that tag will be displayed. */
  setSearchTag(tag: string) {
    this.searchTag = tag;
    this.api_service.getImagesByTag(tag).subscribe(
      (data: ImagesResponse) => {
        console.log("response", data);
        this.images = data.images;
      }
    )
  }
    
  loadRandomImages() {
    this.api_service.getRandomImages().subscribe(
      (data: ImagesResponse) => {
        console.log("response", data);
        this.images = data.images;
      }
    );
  }

  loadFavouriteImages() {
    this.api_service.getFavouriteImages().subscribe(
      (data: ImagesResponse) => {
        console.log("response", data);
        this.images = data.images;
      }
    );
  }

  onClickRefresh() {
    if (this.router.url.startsWith("/home")) {
      this.loadRandomImages();
    } else {
      this.router.navigate(["home"]);
      this.loadRandomImages();
    }
  }

  onClickFavouriteButton(image_id: string) {
    console.log("Favourited", image_id);
    this.api_service.setFavouriteImage(image_id).subscribe(
      (data: FavouritesResponse) => {
        console.log("response", data);
        this.snackBar.open("Saved " + image_id + " as favourite.", "", {duration: 1500});
      }
    );
  }
}
