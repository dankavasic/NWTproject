import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';

import { SednicaService } from '../sednice/sednica.service';
import { Sednica } from '../model/sednica.model';

import 'rxjs/add/operator/switchMap';
import { Zgrada } from '../model/zgrada.model';
import { Korisnik } from '../model/korisnik.model';
import { ZgradaService } from '../zgrade/zgrade.service';

@Component({
  selector: 'app-sednica-detail',
  templateUrl: './sednica-detail.component.html',
  styleUrls: ['./sednica-detail.component.css']
})
export class SednicaDetailComponent implements OnInit {
  sednica = new Sednica({ // if we add a new student, create an empty student 
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
    
  });

  mode: string='ADD';    

  constructor(private zgradaService: ZgradaService, private sednicaService: SednicaService, 
    private route: ActivatedRoute, private location: Location) {
    
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.sednicaService.getSednica(+params['id'])) // convert to number
        .subscribe(sednica => {
          this.sednica = sednica;
          }
        );
        this.route.queryParams.subscribe(params =>
          this.zgradaService.getZgrada(params['zgradaId'])
            .then(zgrada => 
              this.sednica.zgrada = zgrada 
            ));
    } 
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.sednicaService.addSednica(this.sednica)
      .then(sednica => {
        this.sednicaService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.sednicaService.editSednica(this.sednica)
      .then(sednica => {
        this.sednicaService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
