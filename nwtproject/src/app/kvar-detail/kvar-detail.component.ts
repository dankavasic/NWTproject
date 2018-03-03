import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { KvarService } from '../kvarovi/kvarovi.service';
import { Kvar } from '../model/kvar.model';
import {Korisnik} from '../model/korisnik.model';
import {Zgrada} from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ZgradaService } from '../zgrade/zgrade.service';
import { KorisnikService } from '../korisnici/korisnik.service';
import { Komentar } from '../model/komentar.model';
import { KomentarService } from '../komentari/komentari.service';

@Component({
  selector: 'app-kvar-detail',
  templateUrl: './kvar-detail.component.html',
  styleUrls: ['./kvar-detail.component.css']
})
export class KvarDetailComponent implements OnInit {

  ngbDatKreiranja: NgbDateStruct;
  ngbDatZakazivanja: NgbDateStruct;
  ngbDatPopravke: NgbDateStruct;
  
  kvar: Kvar;

  komentari: Komentar[];

  mode: string;

  constructor(private kvarService: KvarService, private zgradaService: ZgradaService,
    private korisnikService: KorisnikService, private komentarService: KomentarService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    komentarService.RegenerateData$.subscribe(() =>
      this.getKomentari()
    )
    this.kvar = new Kvar({ // if we add a new course, create an empty course
    
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
      /*radnik: new Korisnik({
        ime: '',
        lozinka: '',
        korisIme: '',
        uloga: '',
      })*/
    });
    this.mode = 'ADD';
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT';
      // fetch course if we edit the existing course
      this.route.params
        .switchMap((params: Params) =>
          this.kvarService.getKvar(+params['id']))
        .subscribe(kvar => {
          this.kvar = kvar;
          this.getKomentari();
        });
        this.route.queryParams.subscribe(params =>
          this.zgradaService.getZgrada(params['zgradaId'])
            .then(zgrada => 
              this.kvar.zgrada = zgrada 
            ));
    }
  }

  private getKomentari(): void {
    this.kvarService.getKvarKomentar(this.kvar.id).then(komentari =>
      this.komentari = komentari);
  }


  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();
  }

  private add(): void {
    this.kvar.datKreiranja = new Date(this.ngbDatKreiranja.year, this.ngbDatKreiranja.month-1,this.ngbDatKreiranja.day);
    
    this.kvarService.addKvar(this.kvar)
      .then(kvar => {
        this.kvarService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.kvar.datZakazivanja = new Date(this.ngbDatZakazivanja.year, this.ngbDatZakazivanja.month-1, this.ngbDatZakazivanja.day);
    this.kvar.datPopravke = new Date(this.ngbDatPopravke.year, this.ngbDatPopravke.month-1,this.ngbDatPopravke.day);
    
    this.kvarService.editKvar(this.kvar)
      .then(kvar => {
        this.kvarService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

  gotoAddKomentar(): void {
    this.router.navigate(['/addKomentar'], { queryParams: { kvarId: this.kvar.id } });
  }

  deleteKomentar(komentarId: number): void {
    this.komentarService.deleteKomentar(komentarId).then(
      () => this.getKomentari()
    )
   }

}
