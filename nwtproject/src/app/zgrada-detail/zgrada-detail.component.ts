import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ZgradaService } from '../zgrade/zgrada.service';
import { Zgrada } from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-zgrada-detail',
  templateUrl: './zgrada-detail.component.html',
  styleUrls: ['./zgrada-detail.component.css']
})
export class ZgradaDetailComponent implements OnInit {
  zgrada: Zgrada;

  mode: string;    

  constructor(private zgradaService: ZgradaService, private route: ActivatedRoute, private location: Location) {
    this.zgrada = new Zgrada({ // if we add a new student, create an empty student
        ime: '',
        adresa: '',
        vlasnik: ''
      });

    this.mode = 'ADD'
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
          }
        );
    } 
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.zgradaService.addZgrada(this.zgrada)
      .then(zgrada => {
        this.zgradaService.announceChange();
        this.goBack();
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

}
