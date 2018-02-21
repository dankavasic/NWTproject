import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from './korisnik.service';

@Component({
  selector: 'korisnici-list',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  korisnici: Korisnik[];

  subscription: Subscription;

  constructor(private korisnikService: KorisnikService, private router: Router) {
    this.subscription = korisnikService.RegenerateData$.subscribe(() =>
      this.getKorisnici()
    );
  }

  ngOnInit(): void {
    this.getKorisnici();
  }

  getKorisnici() {
    this.korisnikService.getKorisnici().then(korisnici =>
      this.korisnici = korisnici);
  }

  gotoAdd(): void {
    this.router.navigate(['/addKorisnik']);
  }

  gotoEdit(korisnik: Korisnik): void {
    this.router.navigate(['/editKorisnik', korisnik.id]);
  }

  deleteKorisnik(korisnikId: number): void {
    this.korisnikService.deleteKorisnik(korisnikId).then(
      () => this.getKorisnici()
    );
  }
}
