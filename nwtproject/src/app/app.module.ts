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


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ZgradeComponent,
    StanoviComponent

  ],
  imports: [  
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ZgradaService,StanService],
  bootstrap: [AppComponent],

})
export class AppModule { }
