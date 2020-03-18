import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostComponent } from './cost/cost.component';
import {ComplianceComponent} from './compliance/compliance.component';

import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path:'home',component: HomeComponent},
  { path: 'cost', component: CostComponent },
  {path: 'compliance', component: ComplianceComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
