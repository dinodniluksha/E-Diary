import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-customers-login',
  templateUrl: './customers-login.component.html',
  styleUrls: ['./customers-login.component.css']
})
export class CustomersLoginComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.authService.authPageHandler();
  }
}
