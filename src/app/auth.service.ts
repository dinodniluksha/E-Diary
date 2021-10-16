import { Injectable } from '@angular/core';

import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  login(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
      console.log(socialUser);
      localStorage.setItem('socialusers', JSON.stringify(socialUser));
      localStorage.setItem('loggeduser', socialUser.firstName); //store photoUrl in localstorege
      
      this.router.navigate(['/home']);
    });
    this.router.navigate(['/home']);   
  }

  logout(){
    // clean key in LocalStorage
    this.socialAuthService.signOut();
    localStorage.removeItem('socialusers');
    localStorage.removeItem('loggeduser');
    this.router.navigate(['/login']);  
  }

  authPageHandler(){
    if(localStorage.getItem('socialusers') == null){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/home']);
    }
  }
}
