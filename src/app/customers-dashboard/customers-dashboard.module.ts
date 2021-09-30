import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersDashboardRoutingModule } from './customers-dashboard-routing.module';
import { CustomersDashboardComponent } from './customers-dashboard.component';

import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';

@NgModule({
  declarations: [
    CustomersDashboardComponent,
    NavbarTopComponent,
    NavbarSideComponent,
  ],
  imports: [
    CommonModule,
    CustomersDashboardRoutingModule
  ]
})
export class CustomersDashboardModule { }
