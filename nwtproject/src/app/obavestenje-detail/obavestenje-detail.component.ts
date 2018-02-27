import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { ObavestenjeService } from '../obavestenja/obavestenja.service';
import { Obavestenje } from '../model/obavestenje.model';
import {Korisnik} from '../model/korisnik.model';
import {Zgrada} from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ZgradaService } from '../zgrade/zgrade.service';
import { KorisnikService } from '../korisnici/korisnik.service';

@Component({
  selector: 'app-obavetsenje-detail',
  templateUrl: './obavestenje-detail.component.html',
  styleUrls: ['./obavestenje-detail.component.css']
})
export class ObavestenjeDetailComponent implements OnInit {

  ngbDatKreiranja: NgbDateStruct;
  
  obavestenje: Obavestenje;

  mode: string;

  constructor(private obavestenjeService: ObavestenjeService, private zgradaService: ZgradaService,
    private korisnikService: KorisnikService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    
    this.obavestenje = new Obavestenje({ // if we add a new course, create an empty course
    
      datKreiranja: null,
      ime: '',
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
      })
    });
    this.mode = 'ADD';
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT';
      // fetch course if we edit the existing course
      this.route.params
        .switchMap((params: Params) =>
          this.obavestenjeService.getObavestenje(+params['id']))
        .subscribe(obavestenje => {
          this.obavestenje = obavestenje;
        });
        this.route.queryParams.subscribe(params =>
          this.zgradaService.getZgrada(params['zgradaId'])
            .then(zgrada => 
              this.obavestenje.zgrada = zgrada 
            ));
    }
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();
  }

  private add(): void {
    this.obavestenje.datKreiranja = new Date(this.ngbDatKreiranja.year, this.ngbDatKreiranja.month-1,this.ngbDatKreiranja.day);
    
    this.obavestenjeService.addObavestenje(this.obavestenje)
      .then(obavestenje => {
        this.obavestenjeService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.obavestenjeService.editObavestenje(this.obavestenje)
      .then(obavestenje => {
        this.obavestenjeService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
