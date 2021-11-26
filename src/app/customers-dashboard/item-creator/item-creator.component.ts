import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImageStoreService } from 'src/app/customers-dashboard/image-store.service';
import { ItemService } from 'src/app/customers-dashboard/item.service';
import { Globals } from '../globals';


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

  userAttributes!: string[];
  attributesData: any = {};


  ngOnInit(): void {
  }

  setUserAttributes(type: any) {
    switch (type) {
      case 'Car':
        this.userAttributes = ['size', 'color', 'capacity', 'price', 'year'];
        break;
      case 'Bus':
        this.userAttributes = ['size', 'color', 'capacity', 'price'];
        break;
      case 'Van':
        this.userAttributes = ['size', 'price', 'year'];
        break;
      case 'Bag':
        this.userAttributes = ['color', 'capacity'];
        break;
    }
  }

  buildItemCreatorForm(): FormGroup {
    for (let i = 0; i < this.userAttributes.length; i++) {
      console.log(this.userAttributes[i]);
      this.attributesData[this.userAttributes[i]] = [''];
    }
    this.attributesData['image'] = this.fb.group({
      key: [null],
      imageUrl: [this.nullImageUrl],
    });
    console.log(this.attributesData);
    return this.fb.group(this.attributesData);
  }

  constructor(private fb: FormBuilder, private imageStoreService: ImageStoreService, private itemService: ItemService, private globals: Globals) {
    console.log(globals.itemType);
    this.setUserAttributes(globals.itemType);
    this.form = this.fb.group({
      useremail: [''],
      type: [''],
      attributes: this.buildItemCreatorForm(),
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
        type: this.globals.itemType,
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
        type: this.globals.itemType,
      });
      console.log(this.form.value);
      this.bindCreateItemApi();
      this.fullReset(); // call after succeed createitem API endpoint
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
    this.bindCreateItemApi();
    this.fullReset();  // call after succeed createitem API endpoint 
  }

  var = this.imageStoreService.getItemFormUpdate().subscribe(() => {
    this.itemFormUpdate();
  });

  fullReset() {
    this.form.reset();
    //window.location.reload();
  }

  bindCreateItemApi() {
    var formData: any = new FormData();

    formData.append('useremail', this.form.get('useremail')?.value);
    formData.append('type', this.form.get('type')?.value);
    formData.append('attributes', JSON.stringify(this.form.get('attributes')?.value));

    this.itemService.callCreateItemEndPoint(formData);
  }
}
