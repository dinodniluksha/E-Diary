import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImageStoreService } from 'src/app/customers-dashboard/image-store.service';
import { ItemService } from 'src/app/customers-dashboard/item.service';
import { ItemStructureService } from 'src/app/customers-dashboard/item-structure.service';
import { Globals } from '../globals';
import { NgxSpinnerService } from "ngx-spinner";

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

  userEmail: string | null = this.globals.userEmail;
  userAttributes!: string[];
  attributesData: any = {};

  basket: string[] = [];
  formReady: boolean = false;

  ngOnInit(): void {
    this.spinner.show();
  }

  buildItemCreatorForm(): FormGroup {
    this.userAttributes = this.globals.myAttributes;
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

  constructor(
    private fb: FormBuilder,
    private imageStoreService: ImageStoreService,
    private itemService: ItemService,
    private itemStructureService: ItemStructureService,
    private globals: Globals,
    private spinner: NgxSpinnerService
  ) {
    console.log('Call item structure API: ' + this.globals.itemType);

    const useremail = this.userEmail;
    this.itemStructureService.getItemStructure(useremail, globals.itemType).subscribe({
      next: (data: any) => {
        this.resetArray(this.globals.myAttributes);
        console.log(data.structureFields);
        for (var key in data.structureFields) {
          this.globals.myAttributes.push(key);
        }
        //console.log(this.globals.myAttributes);
      },
      complete: () => {
        console.log('API call completed');
        this.spinner.hide();
        this.formReady = true;
        this.form = this.fb.group({
          useremail: [''],
          type: [''],
          attributes: this.buildItemCreatorForm(),
        });
      }
    });
  }

  selectImage(event: any) {
    this.file = event.target.files[0];
  }

  itemCreate() {
    if (this.file) {
      console.log(this.file);
      this.form.patchValue({
        useremail: this.userEmail,
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
        useremail: this.userEmail,
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

  resetArray(source: any) {
    source.splice(0, source.length);
  }
}
