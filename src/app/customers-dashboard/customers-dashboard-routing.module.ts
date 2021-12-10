import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersDashboardComponent } from './customers-dashboard.component';
import { ItemPageComponent } from './item-page/item-page.component';

const routes: Routes = [
  {
    path: '', component: CustomersDashboardComponent,
    children: [
      { path: ':type', component: ItemPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersDashboardRoutingModule { }
