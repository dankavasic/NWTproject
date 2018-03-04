import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Stavka } from '../model/stavka.model';
import { StavkaService } from './stavke.service';
import { SednicaService } from '../sednice/sednica.service';

@Component({
    selector: 'stavke-list',
    templateUrl: './stavke.component.html',
    styleUrls: ['./stavke.component.css']
  })

  export class StavkeComponent implements OnInit {

    stavka: Stavka[];
  
    subscription: Subscription;
  
    constructor(private stavkaService: StavkaService,private sednicaService: SednicaService, private router: Router) {
      this.subscription = stavkaService.RegenerateData$.subscribe(() =>
        this.getStavke()
      );
    }
  
    ngOnInit(): void {
      this.getStavke();
    }
  
    getStavke() {
      this.stavkaService.getStavke().then(stavke =>
        this.stavka = stavke);
    }
  
    gotoAdd(): void {
      this.router.navigate(['/addStavka']);
    }
  
    gotoEdit(stavka: Stavka): void {
      this.router.navigate(['/editStavka', stavka.id]);
    }
  
    deleteStavka(stavkeId: number): void {
      this.stavkaService.deleteStavka(stavkeId).then(
        () => this.getStavke()
      );
    }
}


