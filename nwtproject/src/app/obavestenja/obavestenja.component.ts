import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Obavestenje } from '../model/obavestenje.model';
import { ObavestenjeService } from './obavestenja.service';

@Component({
  selector: 'obavestenja-list',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  obavestenja: Obavestenje[];

  subscription: Subscription;

  constructor(private obavestenjeService: ObavestenjeService, private router: Router) {
    this.subscription = obavestenjeService.RegenerateData$.subscribe(() =>
      this.getObavestenja()
    );
  }

  ngOnInit(): void {
    this.getObavestenja();
  }

  getObavestenja() {
    this.obavestenjeService.getObavestenja().then(obavestenja =>
      this.obavestenja = obavestenja);
  }

  gotoAdd(): void {
    this.router.navigate(['/addobavestenje']);
  }

  gotoEdit(obavestenje: Obavestenje): void {
    this.router.navigate(['/editObavestenje', obavestenje.id]);
  }

  deleteObavestenje(obavestenjaId: number): void {
    this,this.obavestenjeService.deleteObavestenje(obavestenjaId).then(
      () => this.getObavestenja()
    );
  }
}
