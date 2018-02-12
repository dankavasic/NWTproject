import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ZgradeComponent } from './zgrade/zgrade.component';
import {StanoviComponent } from './stanovi/stanovi.component';
const routes: Routes = [
  { path: '', component: ZgradeComponent },
  { path: 'zgrade', component: ZgradeComponent },
  {path: 'stanovi', component: StanoviComponent},
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
