import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Zapisnik } from '../model/zapisnik.model';
import { ZapisnikService } from './zapisnici.service';
import { SednicaService } from '../sednice/sednica.service';

@Component({
  selector: 'zapisnici-list',
  templateUrl: './zapisnici.component.html',
  styleUrls: ['./zapisnici.component.css']
})
export class ZapisniciComponent implements OnInit {

  zapisnik: Zapisnik[];

  subscription: Subscription;

  constructor(private zapisnikService: ZapisnikService,private sednicaService: SednicaService, private router: Router) {
    this.subscription = zapisnikService.RegenerateData$.subscribe(() =>
      this.getZapisnici()
    );
  }

  ngOnInit(): void {
    this.getZapisnici();
  }

  getZapisnici() {
    this.zapisnikService.getZapisnici().then(zapisnici =>
      this.zapisnik = zapisnici);
  }

  /*getKvar(id: number): void {
    this.kvarService.getKvar(id).then(
      this.komentarService.getKomentar()
    )
  }*/

  gotoAdd(): void {
    this.router.navigate(['/addZapisnik']);
  }

  gotoEdit(zapisnik: Zapisnik): void {
    this.router.navigate(['/editZapisnik', zapisnik.id]);
  }

  deleteZapisnik(zapisniciId: number): void {
    this.zapisnikService.deleteZapisnik(zapisniciId).then(
      () => this.getZapisnici()
    );
  }
}
