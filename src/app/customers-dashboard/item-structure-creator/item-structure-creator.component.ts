import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

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
  user: string = 'dinod@gmail.com';

  constructor(private fb: FormBuilder,) {
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
      useremail: [this.user],
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
      useremail: [this.user],
      itemtype: [this.itemtype],
      structurefields: this.buildItemCreatorForm(),
    });
  }

  itemCreate() {
    console.log(this.form.value);
  }

  removeElementFromAttributes(element: string) {
    this.userAttributes.forEach((value: any, index: any) => {
      if (value == element) this.userAttributes.splice(index, 1);
    });
    console.log(this.userAttributes);
  }
}
