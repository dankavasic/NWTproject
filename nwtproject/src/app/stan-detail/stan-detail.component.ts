import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';

import { StanService } from '../stanovi/stan.service';
import { Stan } from '../model/stan.model';

import 'rxjs/add/operator/switchMap';
import { Zgrada } from '../model/zgrada.model';
import { Korisnik } from '../model/korisnik.model';
import { ZgradaService } from '../zgrade/zgrade.service';

@Component({
  selector: 'app-stan-detail',
  templateUrl: './stan-detail.component.html',
  styleUrls: ['./stan-detail.component.css']
})
export class StanDetailComponent implements OnInit {
  stan: Stan;
  
  mode: string;  

  constructor(private stanService: StanService,private zgradaService: ZgradaService,
     private route: ActivatedRoute, private location: Location) {
      this.stan = new Stan({ // if we add a new student, create an empty student 
        adresa: '',
        brStanovnika: '',
        ime: '',
        vlasnik: new Korisnik({
          ime: '',
          lozinka: '',
          korisIme: '',
          uloga: '',
        }),
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
        })
      })
        
    this.mode = 'ADD';
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.stanService.getStan(+params['id'])) // convert to number
        .subscribe(stan => {
          this.stan = this.stan;
          }
        );
        this.route.queryParams.subscribe(params =>
          this.zgradaService.getZgrada(params['zgradaId'])
            .then(zgrada => 
              this.stan.zgrada = zgrada 
            ));
        
    } 
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.stanService.addStan(this.stan)
      .then(stan => {
        this.stanService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.stanService.editStan(this.stan)
      .then(stan => {
        this.stanService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
