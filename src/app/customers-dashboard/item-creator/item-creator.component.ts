import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImageStoreService } from 'src/app/customers-dashboard/image-store.service'

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent implements OnInit {
  form!: FormGroup;
  file!: File;
  percentage = 0;
  nullImageUrl = 'https://firebasestorage.googleapis.com/v0/b/pro1-eece0.appspot.com/o/E-Diary_Images%2Fno_image.png?alt=media&token=88036ea7-c504-4b46-8ddc-0e5f7d9c0a18';

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private imageStoreService: ImageStoreService) {
    this.form = this.fb.group({
      useremail: ['dinod@gmail.com'],
      type: ['Car'],
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

  selectImage(event:any) {
    this.file = event.target.files[0];
    
  }

  itemCreate() {
    if(this.file){
      console.log(this.file);
      this.imageStoreService.imageUpload(this.file).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      // call createitem API endpoint
      console.log(this.form.value);
    }
  }

  itemFormUpdate(){
    console.log('Yes...uploadig completed');
    this.form.patchValue({
      attributes: {
        image: {
          key: this.imageStoreService.key,
          imageUrl: this.imageStoreService.downloadURL,
        },
      }
    });
    // call createitem API endpoint
    console.log(this.form.value);
  }

  var = this.imageStoreService.getItemFormUpdate().subscribe(()=>{
    this.itemFormUpdate();
  });


}
