import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { SocialAuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  //User!: SocialUser;
  isLoggedin!: boolean;

  constructor(private router: Router,
    //private socialAuthService: SocialAuthService
    ) {

    
  }
  ngOnInit(): void {

    if(localStorage.getItem('socialusers') == null)
    {
      this.router.navigate(['/login']);
    }
  }

  loggedUser = localStorage.getItem('loggeduser');

  Logout()
  {
    // clean key in LocalStorage
    //this.socialAuthService.signOut();
    localStorage.removeItem('socialusers')
    this.router.navigate(['/login']);  
  }
}

//-------------------------------------    ----------------------------------
 