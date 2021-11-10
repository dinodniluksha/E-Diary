import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersDashboardComponent } from './customers-dashboard.component';
import { ItemCreatorComponent } from './item-creator/item-creator.component';

const routes: Routes = [
  { path: '', component: CustomersDashboardComponent },
  { path: 'additem', component: ItemCreatorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersDashboardRoutingModule { }
