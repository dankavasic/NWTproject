import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { ZapisnikService } from '../zapisnici/zapisnici.service';
import { Komentar } from '../model/komentar.model';
import {Korisnik} from '../model/korisnik.model';
import {Sednica} from '../model/sednica.model';
import {Zgrada} from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SednicaService } from '../sednice/sednica.service';
import { KorisnikService } from '../korisnici/korisnik.service';
import { Zapisnik } from '../model/zapisnik.model';

@Component({
  selector: 'app-zapisnik-detail',
  templateUrl: './zapisnik-detail.component.html',
  styleUrls: ['./zapisnik-detail.component.css']
})
export class ZapisnikDetailComponent implements OnInit {

  ngbDatKreiranja: NgbDateStruct;
  
  zapisnik: Zapisnik = new Zapisnik({ // if we add a new course, create an empty course
    
    datKreiranja: null,
    opis: '',
    kreator: new Korisnik({
      ime: '',
      lozinka: '',
      korisIme: '',
      uloga: '',
    }),
    zgrada: new Zgrada({
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
    sednica : new Sednica({
        aktivna: false,
        datKreiranja: null,
        datZakazivanja: null,
        kreator: new Korisnik({
            ime: '',
            lozinka: '',
            korisIme: '',
            uloga: '',
          }),
        zgrada: new Zgrada({
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
          })
    })
    
  });

  zapisnici: Zapisnik[];

  mode: string = 'ADD';

  constructor(private zapisnikService: ZapisnikService, private sednicaService: SednicaService,
    private korisnikService: KorisnikService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    /*komentarService.RegenerateData$.subscribe(() =>
      this.getEnrollments()
    );*/
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT';
      // fetch course if we edit the existing course
      this.route.params
        .switchMap((params: Params) =>
          this.zapisnikService.getZapisnik(+params['id']))
        .subscribe(zapisnik => {
          this.zapisnik = zapisnik;
        });
        this.route.queryParams.subscribe(params =>
          this.sednicaService.getSednica(params['sednicaId'])
            .then(sednica => 
              this.zapisnik.sednica = sednica
            ));
    }
  }



  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();
  }

  private add(): void {
    this.zapisnik.datKreiranja = new Date(this.ngbDatKreiranja.year, this.ngbDatKreiranja.month-1,this.ngbDatKreiranja.day);
    
    this.zapisnikService.addZapisnik(this.zapisnik)
      .then(zapisnik => {
        this.zapisnikService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.zapisnikService.editZapisnik(this.zapisnik)
      .then(zapisnik => {
        this.zapisnikService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }


}
