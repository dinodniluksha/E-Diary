import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersLoginRoutingModule } from './customers-login-routing.module';
import { CustomersLoginComponent } from './customers-login.component';


@NgModule({
  declarations: [
    CustomersLoginComponent
  ],
  imports: [
    CommonModule,
    CustomersLoginRoutingModule
  ]
})
export class CustomersLoginModule { }
