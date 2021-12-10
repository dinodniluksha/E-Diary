import { Component, OnInit } from '@angular/core';
import { Globals } from './globals';

@Component({
  selector: 'app-customers-dashboard',
  templateUrl: './customers-dashboard.component.html',
  styleUrls: ['./customers-dashboard.component.css']
})
export class CustomersDashboardComponent implements OnInit {

  constructor(private globals: Globals,) {
    this.globals.userEmail = localStorage.getItem('userEmail');
  }

  ngOnInit(): void {
  }

}
