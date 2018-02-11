import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import { ZgradaService } from './zgrade/zgrada.service';


@NgModule({
  declarations: [
    AppComponent,
    ZgradeComponent

  ],
  imports: [  
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ZgradaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
