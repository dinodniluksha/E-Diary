import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CustomersDashboardRoutingModule } from './customers-dashboard-routing.module';
import { CustomersDashboardComponent } from './customers-dashboard.component';

import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { ItemCreatorComponent } from './item-creator/item-creator.component';
import { ItemPageComponent } from './item-page/item-page.component';

@NgModule({
  declarations: [
    CustomersDashboardComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    ItemCreatorComponent,
    ItemPageComponent,
  ],
  imports: [
    CommonModule,
    CustomersDashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CustomersDashboardModule { }
