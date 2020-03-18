import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostComponent } from './cost/cost.component';
import { HttpClientModule } from '@angular/common/http';
import { CostService } from './cost/cost.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ComplianceComponent } from './compliance/compliance.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CostComponent,
    ComplianceComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [CostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
