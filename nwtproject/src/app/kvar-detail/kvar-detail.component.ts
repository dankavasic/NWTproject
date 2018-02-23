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
import { ZgradaService } from '../zgrade/zgrada.service';
import { KorisnikService } from '../korisnici/korisnik.service';

@Component({
  selector: 'app-kvar-detail',
  templateUrl: './kvar-detail.component.html',
  styleUrls: ['./kvar-detail.component.css']
})
export class KvarDetailComponent implements OnInit {

  ngbDatKreiranja: NgbDateStruct;
  ngbDatZakazivanja: NgbDateStruct;
  ngbDatPopravke: NgbDateStruct;
  
  kvar: Kvar = new Kvar({ // if we add a new course, create an empty course
    
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
      vlasnik: new Korisnik({
        ime: '',
        lozinka: '',
        korisIme: '',
        uloga: '',
      })
    }),
    radnik: new Korisnik({
      ime: '',
      lozinka: '',
      korisIme: '',
      uloga: '',
    })
  });

  //komentari: Komentar[];

  mode: string = 'ADD';

  constructor(private kvarService: KvarService, private zgradaService: ZgradaService,
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
          this.kvarService.getKvar(+params['id']))
        .subscribe(kvar => {
          this.kvar = kvar;
          //this.getKomentari();
        });
    }
  }

  /*private getKomentari(): void {
    this.kvarService.getKvarKomentari(this.kvar.id).then(komentari =>
      this.komentari = komentari);
  }*/


  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();
  }

  private add(): void {
    this.kvarService.addKvar(this.kvar)
      .then(kvar => {
        this.kvarService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.kvarService.editKvar(this.kvar)
      .then(kvar => {
        this.kvarService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

  /*gotoAddKomentar(): void {
    this.router.navigate(['/addKomentar'], { queryParams: { kvarId: this.kvar.id } });
  }

  deleteKomentar(komentarId: number): void {
    this.komentarService.deleteKomentar(komentarId).then(
      () => this.getKomentar()
    );
  }*/

}
