import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CustomersDashboardRoutingModule } from './customers-dashboard-routing.module';
import { CustomersDashboardComponent } from './customers-dashboard.component';

import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { ItemCreatorComponent } from './item-creator/item-creator.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { Globals } from './globals';
import { NgxSpinnerModule } from "ngx-spinner";
import { ItemStructureCreatorComponent } from './item-structure-creator/item-structure-creator.component';

@NgModule({
  declarations: [
    CustomersDashboardComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    ItemCreatorComponent,
    ItemPageComponent,
    ItemStructureCreatorComponent,
  ],
  imports: [
    CommonModule,
    CustomersDashboardRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [Globals],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomersDashboardModule { }
