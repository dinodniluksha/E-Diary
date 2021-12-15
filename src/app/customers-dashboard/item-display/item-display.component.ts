import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit {

  @Input() itemBox!: Item;
  @Input() itemNo!: number;

  attributes = ["Color: Red", "Prize: 12", "Size: Large"];

  constructor() { }

  ngOnInit(): void {
    console.log('Pop-up item');
    this.setAttributes(this.itemBox.attributes);
  }

  setAttributes(obj: any) {
    this.resetArray(this.attributes);
    for (var key in obj) {
      if (key != 'image') {
        var featureLine = key + ': ' + obj[key];
        //console.log(featureLine);
        this.attributes.push(featureLine);
      }
    }
  }

  resetArray(source: any) {
    source.splice(0, source.length);
  }
}
