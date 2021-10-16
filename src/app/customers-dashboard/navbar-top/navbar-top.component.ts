import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  
  constructor(
    public authService: AuthService,
  ) {}

  loggedUser!: string | null;

  ngOnInit(): void {
    this.authService.authPageHandler();
    this.loggedUser = localStorage.getItem('loggeduser');
  }
}

 