// import { Search } from './../search';

// import { Search } from './../customers-dashboard/search';
// import { SEARCHES } from './../customers-dashboard/saved-properties';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements OnInit {
  
  // searches: Search[] = SEARCHES;
  // showMe:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // toogleTag(){
  //   this.showMe=!this.showMe
  // }

}
