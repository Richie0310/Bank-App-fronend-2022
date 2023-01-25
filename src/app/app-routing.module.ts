import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  // login - http://localhost:4200/
  {
    path:'', component:LoginComponent
  },
  // register - http://localhost:4200/register
  {
    path:'register', component:RegisterComponent
  },
  // dashboard - http://localhost:4200/dashboard
  {
    path:'dashboard', component:DashboardComponent
  },
  // transaction - http://localhost:4200/transaction
  {
    path: 'transaction', component:TransactionComponent
  },
  // page not found component
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
