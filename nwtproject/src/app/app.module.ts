import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import { ZgradaService } from './zgrade/zgrada.service';
import {StanoviComponent}from './stanovi/stanovi.component';
import { StanService} from './stanovi/stan.service';
import {FirmeComponent} from './firme/firme.component';
import {FirmaService} from './firme/firma.service';
import {FirmaDetailComponent} from './firma-detail/firma-detail.component'


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ZgradaDetailComponent } from './zgrada-detail/zgrada-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ZgradeComponent,
    StanoviComponent,
    FirmeComponent,
    ZgradaDetailComponent,
    FirmaDetailComponent

  ],
  imports: [  
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ZgradaService,StanService, FirmaService],
  bootstrap: [AppComponent],

})
export class AppModule { }
