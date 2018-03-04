import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';

import { StavkaService } from '../stavke/stavke.service';
import { Stavka } from '../model/stavka.model';

import 'rxjs/add/operator/switchMap';
import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from '../korisnici/korisnik.service';
import { Sednica } from '../model/sednica.model';
import { SednicaService } from '../sednice/sednica.service';
import { Zgrada } from '../model/zgrada.model';

@Component({
  selector: 'app-stavka-detail',
  templateUrl: './stavka-detail.component.html',
  styleUrls: ['./stavka-detail.component.css']
})
export class StavkaDetailComponent implements OnInit {
  stavka = new Stavka({ // if we add a new student, create an empty student 
    datKreiranja: null,
    ime: '',
    opis: '',
    kreator: new Korisnik({
        ime: '',
        lozinka: '',
        korisIme: '',
        uloga: '',
      }),
    sednica: new Sednica({
        datKreiranja: null,
    datZakazivanja: null,
    aktivna: false,
    zgrada : new Zgrada({
        ime: '',
        adresa: '',
        brStanova: null,
        brNaseljenih: null,
        vlasnik: new Korisnik({
          ime: '',
          lozinka: '',
          korisIme: '',
          uloga: '',
        })
      }),
    kreator: new Korisnik({
        ime: '',
        lozinka: '',
        korisIme: '',
        uloga: '',
      })
    })
    
  });

  stavke: Stavka[];
  mode: string = 'ADD';    

  constructor(private stavkaService: StavkaService, private korisnikService: KorisnikService,
    private sednicaService: SednicaService,
    private route: ActivatedRoute, private location: Location) {
    
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.stavkaService.getStavka(+params['id'])) // convert to number
        .subscribe(stavka => {
          this.stavka = stavka;
          });

          this.route.queryParams.subscribe(params =>
            this.sednicaService.getSednica(params['sednicaId'])
              .then(sednica => 
                this.stavka.sednica = sednica
              ));
    } 
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.stavkaService.addStavka(this.stavka)
      .then(stavka => {
        this.stavkaService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.stavkaService.editStavka(this.stavka)
      .then(stavka => {
        this.stavkaService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
