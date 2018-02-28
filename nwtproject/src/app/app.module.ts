import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import { ZgradaService } from './zgrade/zgrade.service';
import {StanoviComponent}from './stanovi/stanovi.component';
import { StanService} from './stanovi/stan.service';
import {FirmeComponent} from './firme/firme.component';
import {FirmaService} from './firme/firma.service';
import {FirmaDetailComponent} from './firma-detail/firma-detail.component';
import { ZgradaDetailComponent } from './zgrada-detail/zgrada-detail.component';
import { StanDetailComponent } from './stan-detail/stan-detail.component';
import { KorisnikDetailComponent } from './korisnik-detail/korisnik-detail.component';
import { KomentarDetailComponent } from './komentar-detail/komentar-detail.component';
import { KomentariComponent } from './komentari/komentari.component';
import { KomentarService } from './komentari/komentari.service';
import {SedniceComponent} from './sednice/sednice.component';
import { SednicaDetailComponent } from './sednica-detail/sednica-detail.component';
import {SednicaService} from './sednice/sednica.service';
import {StavkeComponent} from './stavke/stavke.component';
import { StavkaDetailComponent } from './stavka-detail/stavka-detail.component';
import {StavkaService} from './stavke/stavka.service';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { KvaroviComponent } from './kvarovi/kvarovi.component';
import { KvarDetailComponent } from './kvar-detail/kvar-detail.component';
import { KvarService } from './kvarovi/kvarovi.service';
import { KorisnikService } from './korisnici/korisnik.service';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { ObavestenjeDetailComponent } from './obavestenje-detail/obavestenje-detail.component';
import { ObavestenjeService } from './obavestenja/obavestenja.service';


@NgModule({
  declarations: [
    AppComponent,
    ZgradeComponent,
    StanoviComponent,
    FirmeComponent,
    ZgradaDetailComponent,
    FirmaDetailComponent,
    StanDetailComponent,
    KorisnikDetailComponent,
    KvaroviComponent,
    KvarDetailComponent,
    KomentariComponent,
    KomentarDetailComponent,
    KorisniciComponent,
    SedniceComponent,
    SednicaDetailComponent,
    ObavestenjaComponent,
    ObavestenjeDetailComponent,
    StavkeComponent,
    StavkaDetailComponent

  ],
  imports: [  
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ZgradaService,StanService, FirmaService, KvarService, KomentarService,
    ObavestenjeService, KorisnikService,SednicaService, StavkaService],
  bootstrap: [AppComponent],

})
export class AppModule { }
