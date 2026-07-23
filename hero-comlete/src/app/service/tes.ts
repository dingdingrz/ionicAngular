import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import type { Photo } from '@capacitor/camera'
import { Filesystem,Directory } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: UserPhoto[] = []
  PHOTO_STORAGE:string = 'photo'
  async addNewToGallery() {
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
    console.log(capturePhoto,'cafafd')
    const savedImgUrl = await this.savePicture(capturePhoto)
    this.photos.unshift({
      filepath:'sss',
      webviewPath:capturePhoto.webPath
    })
    // console.log(savedImgUrl,'222222')
    // this.photos.unshift(savedImgUrl)
    // Preferences.set({
    //   key: this.PHOTO_STORAGE,
    //   value:JSON.stringify(this.photos)
    // })
  }
  async loadSaved() {
    const {value: phtotList} = await Preferences.get({key: this.PHOTO_STORAGE});
    this.photos = (phtotList ? JSON.parse(phtotList) :[]) as UserPhoto[]
    for(let photo of this.photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
      })
      photo.webviewPath =  `data:image/jpeg;base64,${readFile.data}`
    }
  }
  async savePicture(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = (await this.convertBlobToBase64(blob)) as string;
    const base64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

   // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }
  convertBlobToBase64(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = (error) => {
        console.log(error, 'convertError');
        reject(error);
      };
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}
export interface UserPhoto {
  filepath: string,
  webviewPath?: string
}
