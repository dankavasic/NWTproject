import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import {StanoviComponent } from './stanovi/stanovi.component';
import { FirmeComponent } from './firme/firme.component';
const routes: Routes = [
  { path: 'zgrade', component: ZgradeComponent },
  {path: 'stanovi', component: StanoviComponent},
  {path: 'firme', component: FirmeComponent},
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
