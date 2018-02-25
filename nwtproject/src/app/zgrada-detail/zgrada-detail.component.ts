import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ZgradaService } from '../zgrade/zgrada.service';
import { Zgrada } from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';
import { Korisnik } from '../model/korisnik.model';
import { Kvar } from '../model/kvar.model';
import { KvarService } from '../kvarovi/kvarovi.service';

@Component({
  selector: 'app-zgrada-detail',
  templateUrl: './zgrada-detail.component.html',
  styleUrls: ['./zgrada-detail.component.css']
})
export class ZgradaDetailComponent implements OnInit {
  
  zgrada: Zgrada;
  mode: string;
  kvarovi: Kvar[];

  constructor(private zgradaService: ZgradaService, private kvarService: KvarService,
     private route: ActivatedRoute, private location: Location, private router: Router) {
     /* zgradaService.RegenerateData$.subscribe(() =>
        this.getKvarovi()
     );*/
     this.zgrada = new Zgrada({ // if we add a new student, create an empty student
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
    });
  
    this.mode = 'ADD';

  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.zgradaService.getZgrada(+params['id'])) // convert to number
        .subscribe(zgrada => {
          this.zgrada = this.zgrada;
          this.getKvarovi;
          }
        );
    } 
  }

  private getKvarovi(): void {
    this.zgradaService.getZgradaKvar(this.zgrada.id).then(kvarovi =>
      this.kvarovi = kvarovi);
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.zgradaService.addZgrada(this.zgrada)
      .then(zgrada => {
        this.zgradaService.announceChange();
        this.zgradaService.getZgrade();
      });
  }

  private edit(): void {
    this.zgradaService.editZgrada(this.zgrada)
      .then(zgrada => {
        this.zgradaService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

  gotoAddKvar(): void {
    this.router.navigate(['/addKvar'], { queryParams: { zgradaId: this.zgrada.id } });
  }

  deleteKvar(kvarId: number): void {
    this.kvarService.deleteKvar(kvarId).then(
      () => this.getKvarovi()
    );
  }
}
