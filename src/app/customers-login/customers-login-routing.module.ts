import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersLoginComponent } from './customers-login.component';

const routes: Routes = [{ path: '', component: CustomersLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersLoginRoutingModule { }
