import { sampleSize } from 'lodash';

export type ImageMetadata = {
    id: string;
    filename: string;
    tags: Array<string>;
}

type Database = {
    images: Array<ImageMetadata>,
    favourites: object,
}

const DATA: Database = {
    images: [
        // Cats
        {"id": "c01", "filename": "cats/cat01.jpg", "tags": ["cat", "kitten", "cute", "whiskers"]},
        {"id": "c02", "filename": "cats/cat02.jpg", "tags": ["cat", "kitten", "cute", "whiskers", "pair"]},
        {"id": "c03", "filename": "cats/cat03.jpg", "tags": ["cat", "kitten", "costume", "hat", "puss-in-boots"]},
        {"id": "c04", "filename": "cats/cat04.jpg", "tags": ["cat", "kitten", "cute", "white", "fluffy"]},
        {"id": "c05", "filename": "cats/cat05.jpg", "tags": ["cat", "old", "fluffy"]},
        {"id": "c06", "filename": "cats/cat06.jpg", "tags": ["cat", "kitten", "cute", "flowers", "nature"]},
        {"id": "c07", "filename": "cats/cat07.jpg", "tags": ["cat", "kitten", "cute", "hat", "costume", "pikachu"]},
        {"id": "c08", "filename": "cats/cat08.jpg", "tags": ["cat", "kitten", "cute", "tongue"]},
        {"id": "c09", "filename": "cats/cat09.jpg", "tags": ["cat", "kitten", "cute", "bell", "whiskers"]},
        {"id": "c10", "filename": "cats/cat10.jpg", "tags": ["cat", "whiskers", "rug"]},

        // Dogs
        {"id": "d01", "filename": "dogs/dog01.jpg", "tags": ["dog", "corgi", "nature"]},
        {"id": "d02", "filename": "dogs/dog02.avif", "tags": ["dog", "newspaper"]},
        {"id": "d03", "filename": "dogs/dog03.jpg", "tags": ["dog", "puppy", "funny"]},
        {"id": "d04", "filename": "dogs/dog04.jpg", "tags": ["dog", "puppy", "rug", "cute", "sleepy"]},
        {"id": "d05", "filename": "dogs/dog05.avif", "tags": ["dog", "puppy", "cute", "spaniel", "flowers"]},
        {"id": "d06", "filename": "dogs/dog06.jpg", "tags": ["dog", "puppy", "white", "terrier", "running"]},
        {"id": "d07", "filename": "dogs/dog07.png", "tags": ["dog", "white", "jack-russell", "terrier", "lying"]},
        {"id": "d08", "filename": "dogs/dog08.jpg", "tags": ["dog", "corgi", "nature"]},
        {"id": "d09", "filename": "dogs/dog09.jpg", "tags": ["dog", "puppy", "cute"]},
        {"id": "d10", "filename": "dogs/dog10.jpg", "tags": ["dog", "happy"]},

        // Ducks
        {"id": "u01", "filename": "ducks/duck01.jpg", "tags": ["duck", "fluffy", "white"]},
        {"id": "u02", "filename": "ducks/duck02.jpg", "tags": ["duck", "duckling", "cute", "yellow"]},
        {"id": "u03", "filename": "ducks/duck03.jpg", "tags": ["duck", "duckling", "cute", "yellow", "hand"]},
        {"id": "u04", "filename": "ducks/duck04.jpg", "tags": ["duck", "pair", "duckling", "nature", "sun"]},
        {"id": "u05", "filename": "ducks/duck05.webp", "tags": ["duck", "duckling", "cute", "yellow", "nature"]},
        {"id": "u06", "filename": "ducks/duck06.jpg", "tags": ["duck", "duckling", "happy"]},
        {"id": "u07", "filename": "ducks/duck07.jpg", "tags": ["duck", "selfie"]},
        {"id": "u08", "filename": "ducks/duck08.jpg", "tags": ["duck", "duckling", "cute", "yellow"]},
        {"id": "u09", "filename": "ducks/duck09.jpg", "tags": ["duck", "pair", "cute"]},
        {"id": "u10", "filename": "ducks/duck10.jpg", "tags": ["duck", "rubber", "pilot", "gangster"]},
    ],
    favourites: {}
}


export function getRandomImages(quantity: number): Array<ImageMetadata> {
    return sampleSize(DATA.images, quantity);
}


export function getImagesByTag(tag: string): Array<ImageMetadata> {
    const results = [];
    for (let image_metadata of DATA.images) {
        if (image_metadata.tags.includes(tag)) {
            results.push(image_metadata);
        }
    }
    return results;
}


export function getTags(): Record<string, number> {
    const result = {};
    for (let image_metadata of DATA.images) {
        for (let tag of image_metadata.tags) {
            if (tag in result) {
                result[tag]++;
            } else {
                result[tag] = 1;
            }
        }
    }
    return result;
}


function getImageById(image_id: string): ImageMetadata | null {
    for (let image_metadata of DATA.images) {
        if (image_metadata.id === image_id) {
            return image_metadata;
        }
    }
    return null;
}


export function setFavourite(image_id: string) {
    if (getImageById(image_id)) {
        DATA.favourites[image_id] = true;
        console.log("Set " + image_id + " as favourite");
    }
    else
        throw new Error("image not found: " + image_id);
}


export function getFavouriteImages() {
    const results = [];
    for (let image_metadata of DATA.images) {
        if (DATA.favourites[image_metadata.id]) {
            results.push(image_metadata);
        }
    }
    return results;
}