import { Component, OnInit } from '@angular/core';
import { ItemStruct } from '../item-struct';


@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements OnInit {

  constructor() { }

  itemStructs!: ItemStruct[];

  dummyItemStructs = [{
    "id": 1,
    "type": 'Car',
  },
  {
    "id": 2,
    "type": 'Bag',
  },
  {
    "id": 3,
    "type": 'Phone',
  },
  {
    "id": 3,
    "type": 'Dish',
  }
  ];

  ngOnInit(): void {
    this.itemStructs = this.dummyItemStructs;
    console.log(this.itemStructs);
  }
}


