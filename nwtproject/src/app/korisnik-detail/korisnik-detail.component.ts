import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { KorisnikService } from '../korisnici/korisnik.service';
import { Korisnik } from '../model/korisnik.model';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-korisnik-detail',
  templateUrl: './korisnik-detail.component.html',
  styleUrls: ['./korisnik-detail.component.css']
})
export class KorisnikDetailComponent implements OnInit {
  korisnik: Korisnik;


  mode: string;    

  constructor(private korisnikService: KorisnikService, private route: ActivatedRoute, private location: Location) {
    this.korisnik = new Korisnik({ // if we add a new student, create an empty student
        ime: '',
        korisIme: '',
        lozinka: '',
        uloga: ''
      });

    this.mode = 'ADD'
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.korisnikService.getKorisnik(+params['id'])) // convert to number
        .subscribe(korisnik => {
          this.korisnik = korisnik;
          }
        );
    } 
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.korisnikService.addKorisnik(this.korisnik)
      .then(korisnik => {
        this.korisnikService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.korisnikService.editKorisnik(this.korisnik)
      .then(korisnik => {
        this.korisnikService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
