import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ItemStructureService } from '../item-structure.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-item-structure-creator',
  templateUrl: './item-structure-creator.component.html',
  styleUrls: ['./item-structure-creator.component.css']
})
export class ItemStructureCreatorComponent implements OnInit {

  userArray = ['text', 'number', 'date'];

  form!: FormGroup;
  userAttributes: string[] = [];
  attributesData: any = {};
  itemtype: string = '';
  attribute: string = '';
  userEmail: string | null = this.globals.userEmail;

  constructor(private fb: FormBuilder, private itemStructureService: ItemStructureService, private globals: Globals) {
    this.form = this.fb.group({
      useremail: [''],
      itemtype: [''],
      structurefields: this.fb.group({}),
    });
  }

  buildItemCreatorForm(): FormGroup {
    for (let i = 0; i < this.userAttributes.length; i++) {
      console.log(this.userAttributes[i]);
      this.attributesData[this.userAttributes[i]] = [null];
    }
    console.log(this.attributesData);
    return this.fb.group(this.attributesData);
  }

  ngOnInit(): void {
  }

  addField() {
    let attributeValue = (<HTMLInputElement>document.getElementById("attribute")).value;
    //let itemType = (<HTMLInputElement>document.getElementById("itemtype")).value;
    //console.log(this.itemtype);
    this.userAttributes.push(attributeValue);
    console.log('Try to do add a new field');
    this.form = this.fb.group({
      useremail: [this.userEmail],
      itemtype: [this.itemtype],
      structurefields: this.buildItemCreatorForm(),
    });
    (<HTMLInputElement>document.getElementById("attribute")).value = '';
  }

  removeField(x: string) {
    console.log('Removing field : ' + x);
    this.removeElementFromAttributes(x);
    this.attributesData = {};
    this.form = this.fb.group({
      useremail: [this.userEmail],
      itemtype: [this.itemtype],
      structurefields: this.buildItemCreatorForm(),
    });
  }

  createItemStructure() {
    console.log(this.form.value);
    var formData: any = new FormData();

    formData.append('useremail', this.form.get('useremail')?.value);
    formData.append('itemtype', this.form.get('itemtype')?.value);
    formData.append('structurefields', JSON.stringify(this.form.get('structurefields')?.value));

    this.itemStructureService.callCreateItemStructureApi(formData);
    (<HTMLInputElement>document.getElementById("close")).click();
  }

  removeElementFromAttributes(element: string) {
    this.userAttributes.forEach((value: any, index: any) => {
      if (value == element) this.userAttributes.splice(index, 1);
    });
    console.log(this.userAttributes);
  }
}
