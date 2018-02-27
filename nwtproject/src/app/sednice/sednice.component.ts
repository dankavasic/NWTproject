import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Sednica } from '../model/sednica.model';
import { SednicaService } from './sednica.service';

@Component({
    selector: 'sednica-list',
    templateUrl: './sednice.component.html',
    styleUrls: ['./sednice.component.css']
  })

  export class SedniceComponent implements OnInit {

    sednice: Sednica[];
  
    subscription: Subscription;
  
    constructor(private sednicaService: SednicaService, private router: Router) {
      this.subscription = sednicaService.RegenerateData$.subscribe(() =>
        this.getSednice()
      );
    }
  
    ngOnInit(): void {
      this.getSednice();
    }
  
    getSednice() {
      this.sednicaService.getSednice().then(sednice =>
        this.sednice = sednice);
    }
  
    gotoAdd(): void {
      this.router.navigate(['/addSednica']);
    }
  
    gotoEdit(sednica: Sednica): void {
      this.router.navigate(['/editSednica', sednica.id]);
    }
  
    deleteSednica(sednicaId: number): void {
      this.sednicaService.deleteSednica(sednicaId).then(
        () => this.getSednice()
      );
    }
}


