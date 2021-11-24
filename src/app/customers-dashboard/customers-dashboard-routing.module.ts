import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersDashboardComponent } from './customers-dashboard.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemStruct } from './item-struct';

var x = 'Car'
var y: ItemStruct[];

const dummyItemStructs = [{
  "id": 1,
  "type": 'Car',
},
{
  "id": 2,
  "type": 'Bus',
},
{
  "id": 3,
  "type": 'Van',
},
{
  "id": 3,
  "type": 'Bag',
}
];
var itemStructs = dummyItemStructs;

const routes: Routes = [
  {
    path: '', component: CustomersDashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: itemStructs[0].type },
      { path: ':type', component: ItemPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersDashboardRoutingModule { }
