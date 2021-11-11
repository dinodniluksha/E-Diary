import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageStoreService {
  downloadURL!: any;
  key!:number;
  fileRef!: AngularFireStorageReference;
  uploadTask!: AngularFireUploadTask;


  constructor(private storage: AngularFireStorage) { }

  private subject = new Subject<any>();

  imageUpload(file:File): Observable<number | undefined>{
    this.key = Date.now();
    const filePath = `E-Diary_Images/${this.key}`;
    this.fileRef = this.storage.ref(filePath);
  
    this.uploadTask = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    this.uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL);
          this.downloadURL = downloadURL;
          this.callItemFormUpdate();
        });
      })
    ).subscribe();  
    // observe percentage changes
    return this.uploadTask.percentageChanges();
  }

  getItemFormUpdate(): Observable<any>{ 
    return this.subject.asObservable();
  }

  callItemFormUpdate(){
    console.log('Called itemFormUpdate(); function');
    this.subject.next();
  }
}
