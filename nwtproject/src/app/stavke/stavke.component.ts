import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Stavka } from '../model/stavka.model';
import { StavkaService } from './stavka.service';

@Component({
    selector: 'stavka-list',
    templateUrl: './stavke.component.html',
    styleUrls: ['./stavke.component.css']
  })

  export class StavkeComponent implements OnInit {

    stavke: Stavka[];
  
    subscription: Subscription;
  
    constructor(private stavkaService: StavkaService, private router: Router) {
      this.subscription = stavkaService.RegenerateData$.subscribe(() =>
        this.getStavke()
      );
    }
  
    ngOnInit(): void {
      this.getStavke();
    }
  
    getStavke() {
      this.stavkaService.getStavke().then(stavke =>
        this.stavke = stavke);
    }
  
    gotoAdd(): void {
      this.router.navigate(['/addStavka']);
    }
  
    gotoEdit(stavka: Stavka): void {
      this.router.navigate(['/editStavka', stavka.id]);
    }
  
    deleteStavka(stavkaId: number): void {
      this.stavkaService.deleteStavka(stavkaId).then(
        () => this.getStavke()
      );
    }
}


