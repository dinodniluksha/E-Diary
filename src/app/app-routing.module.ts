import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./customers-dashboard/customers-dashboard.module').then(m => m.CustomersDashboardModule) }, 
  { path: 'login', loadChildren: () => import('./customers-login/customers-login.module').then(m => m.CustomersLoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
