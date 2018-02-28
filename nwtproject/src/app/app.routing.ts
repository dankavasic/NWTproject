import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import { StanoviComponent } from './stanovi/stanovi.component';
import { FirmeComponent } from './firme/firme.component';
import { ZgradaDetailComponent } from './zgrada-detail/zgrada-detail.component';
import { FirmaDetailComponent } from './firma-detail/firma-detail.component';
import { StanDetailComponent } from './stan-detail/stan-detail.component';
import { KorisnikDetailComponent } from './korisnik-detail/korisnik-detail.component';
import { KvarDetailComponent } from './kvar-detail/kvar-detail.component';
import { KomentarDetailComponent } from './komentar-detail/komentar-detail.component';
import { KomentariComponent } from './komentari/komentari.component';
import { KvaroviComponent } from './kvarovi/kvarovi.component';
import { SednicaDetailComponent} from './sednica-detail/sednica-detail.component';
import { SedniceComponent } from './sednice/sednice.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { ObavestenjeDetailComponent } from './obavestenje-detail/obavestenje-detail.component';
import { StavkaDetailComponent} from './stavka-detail/stavka-detail.component';
import { StavkeComponent } from './stavke/stavke.component';

const routes: Routes = [
  {path: 'zgrade', component: ZgradeComponent },
  {path: 'stanovi', component: StanoviComponent},
  {path: 'firme', component: FirmeComponent},
  {path: 'kvarovi', component:KvaroviComponent},
  {path: 'sednice', component: SedniceComponent},
  {path: 'komentari', component:KomentariComponent},
  {path : 'stavke', component:StavkeComponent},
  {path: 'addZgrada', component:ZgradaDetailComponent},
  {path: 'editZgrada/:id', component:ZgradaDetailComponent},
  {path: 'addFirma', component: FirmaDetailComponent },
  {path: 'editFirma/:id', component: FirmaDetailComponent },
  {path: 'addStan', component:StanDetailComponent},
  {path: 'editStan/:id', component:StanDetailComponent},
  {path: 'addKorisnik', component:KorisnikDetailComponent},
  {path: 'editKorisnik/:id', component:KorisnikDetailComponent},
  {path: 'addKvar', component:KvarDetailComponent},
  {path: 'editKvar/:id', component:KvarDetailComponent},
  {path: 'addKomentar', component:KomentarDetailComponent},
  {path: 'editKomentar/:id', component:KomentarDetailComponent},
  {path: 'addSednica', component: SednicaDetailComponent},
  {path: 'editSednica/:id', component: SednicaDetailComponent},
  {path: 'obavestenja', component: ObavestenjaComponent },
  {path: 'addObavestenje', component: ObavestenjeDetailComponent},
  {path: 'editObavestenje/:id', component: ObavestenjeDetailComponent},
  {path: 'addStavka', component: StavkaDetailComponent},
  {path: 'editStavka/:id', component: StavkaDetailComponent},
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
