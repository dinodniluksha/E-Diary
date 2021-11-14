import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImageStoreService } from 'src/app/customers-dashboard/image-store.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent implements OnInit {
  form!: FormGroup;
  file!: File;
  percentage = 0;
  nullImageUrl = 'https://firebasestorage.googleapis.com/v0/b/e-diary-1e542.appspot.com/o/E-Diary_Images%2Fno_image.png?alt=media&token=030fe8e0-09c5-4c32-a5e8-d3af795992eb';

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private imageStoreService: ImageStoreService, private http: HttpClient) {
    this.form = this.fb.group({
      useremail: [''],
      type: [''],
      attributes: this.fb.group({
        color: [''],
        price: [''],
        image: this.fb.group({
          key: [null],
          imageUrl: [this.nullImageUrl],
        }),
      }),
    });
  }

  selectImage(event: any) {
    this.file = event.target.files[0];
  }

  itemCreate() {
    if (this.file) {
      console.log(this.file);
      this.form.patchValue({
        useremail: 'dinod@gmail.com',
        type: 'Car',
      });
      this.imageStoreService.imageUpload(this.file).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.form.patchValue({
        useremail: 'dinod@gmail.com',
        type: 'Car',
      });
      console.log(this.form.value);
      this.http.post('http://e-diary-app.herokuapp.com/create-item', this.form.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
      //this.fullRest(); // call after succeed createitem API endpoint
    }
  }

  itemFormUpdate() {
    console.log('Yes...uploadig completed');
    this.form.patchValue({
      attributes: {
        image: {
          key: this.imageStoreService.key,
          imageUrl: this.imageStoreService.downloadURL,
        },
      }
    });
    console.log(this.form.value);
    this.http.post('http://e-diary-app.herokuapp.com/create-item', this.form.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    //this.fullRest();  // call after succeed createitem API endpoint 
  }

  var = this.imageStoreService.getItemFormUpdate().subscribe(() => {
    this.itemFormUpdate();
  });

  fullRest() {
    this.form.reset();
    window.location.reload();
  }

  callCreateItemEndPoint(file: File) {

  }
}
