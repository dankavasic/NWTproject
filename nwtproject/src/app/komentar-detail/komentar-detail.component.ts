import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { KomentarService } from '../komentari/komentari.service';
import { Komentar } from '../model/komentar.model';
import {Korisnik} from '../model/korisnik.model';
import {Kvar} from '../model/kvar.model';
import {Zgrada} from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { KvarService } from '../kvarovi/kvarovi.service';
import { KorisnikService } from '../korisnici/korisnik.service';

@Component({
  selector: 'app-komentar-detail',
  templateUrl: './komentar-detail.component.html',
  styleUrls: ['./komentar-detail.component.css']
})
export class KomentarDetailComponent implements OnInit {

  ngbDatKreiranja: NgbDateStruct;
  komentar: Komentar;

  mode: string;

  constructor(private komentarService: KomentarService, private kvarService: KvarService,
    private korisnikService: KorisnikService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    /*komentarService.RegenerateData$.subscribe(() =>
      this.getEnrollments()
    );*/
  
  
  this.komentar= new Komentar({ // if we add a new course, create an empty course
    
    datKreiranja: null,
    text: '',
    kreator: new Korisnik({
      ime: '',
      lozinka: '',
      korisIme: '',
      uloga: '',
    }),

    kvar: new Kvar({
    datKreiranja: null,
    datZakazivanja: null,	
    datPopravke: null,
    ime: '',
    opis: '',
    popravljen: false,
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

  this.mode = 'ADD';
}

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT';
      // fetch course if we edit the existing course
      this.route.params
        .switchMap((params: Params) =>
          this.komentarService.getKomentar(+params['id']))
        .subscribe(komentar => {
          this.komentar = komentar;
        });
        this.route.queryParams.subscribe(params =>
          this.kvarService.getKvar(params['kvarId'])
            .then(kvar => 
              this.komentar.kvar = kvar 
            ));
    }
  }



  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();
  }

  private add(): void {
    this.komentar.datKreiranja = new Date(this.ngbDatKreiranja.year, this.ngbDatKreiranja.month-1,this.ngbDatKreiranja.day);

    this.komentarService.addKomentar(this.komentar)
      .then(komentar => {
        this.komentarService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.komentarService.editKomentar(this.komentar)
      .then(komentar => {
        this.komentarService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }


}
