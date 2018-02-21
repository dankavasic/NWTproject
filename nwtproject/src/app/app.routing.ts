import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import {StanoviComponent } from './stanovi/stanovi.component';
import { FirmeComponent } from './firme/firme.component';
import { ZgradaDetailComponent } from './zgrada-detail/zgrada-detail.component';
const routes: Routes = [
  { path: 'zgrade', component: ZgradeComponent },
  {path: 'stanovi', component: StanoviComponent},
  {path: 'firme', component: FirmeComponent},
  {path: 'addZgrada', component:ZgradaDetailComponent},
  {path: 'editZgrda/:id', component:ZgradaDetailComponent},
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
