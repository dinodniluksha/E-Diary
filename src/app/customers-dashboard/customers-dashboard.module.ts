import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersDashboardRoutingModule } from './customers-dashboard-routing.module';
import { CustomersDashboardComponent } from './customers-dashboard.component';

import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { ItemCreatorComponent } from './item-creator/item-creator.component';

@NgModule({
  declarations: [
    CustomersDashboardComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    ItemCreatorComponent,
  ],
  imports: [
    CommonModule,
    CustomersDashboardRoutingModule
  ]
})
export class CustomersDashboardModule { }
