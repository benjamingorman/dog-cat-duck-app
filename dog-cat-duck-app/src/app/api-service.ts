import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

export type ImagesResponse = {
  images: Array<ImageMetadata>;
}


export type FavouritesResponse = {
  success: boolean;
  reason?: string;
}


export type TagsResponse = Record<string, number>;


export type ImageMetadata = {
    id: string;
    filename: string;
    tags: Array<string>;
}


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getRandomImages(): Observable<ImagesResponse> {
        return this.http.get<ImagesResponse>(API_URL);
    }

    getImagesByTag(tag: string): Observable<ImagesResponse> {
        return this.http.get<ImagesResponse>(API_URL + "/search/" + tag);
    }

    getFavouriteImages(): Observable<ImagesResponse> {
        return this.http.get<ImagesResponse>(API_URL + "/favourites/");
    }

    setFavouriteImage(image_id: string): Observable<any> {
        return this.http.post(API_URL + "/favourite/" + image_id, {});
    }

    getTags(): Observable<TagsResponse> {
        return this.http.get<TagsResponse>(API_URL + "/tags");
    }
}

/* Return the full URL to an image in the backend, given its filename. */
export function getImageURL(filename: string) {
    return `${API_URL}/static/${filename}`;
}