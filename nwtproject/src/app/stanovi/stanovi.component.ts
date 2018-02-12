import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Stan } from '../model/stan.model';
import { StanService } from './stan.service';

@Component({
    selector: 'stanovi-list',
    templateUrl: './stanovi.component.html',
    styleUrls: ['./stanovi.component.css']
  })

  export class StanoviComponent implements OnInit {

    stanovi: Stan[];
  
    subscription: Subscription;
  
    constructor(private stanService: StanService, private router: Router) {
      this.subscription = stanService.RegenerateData$.subscribe(() =>
        this.getStanovi()
      );
    }
  
    ngOnInit(): void {
      this.getStanovi();
    }
  
    getStanovi() {
      this.stanService.getStanovi().then(stanovi =>
        this.stanovi = stanovi);
    }
  
    gotoAdd(): void {
      this.router.navigate(['/addStan']);
    }
  
    gotoEdit(stan: Stan): void {
      this.router.navigate(['/editStan', stan.id]);
    }
  
    deleteStan(stanId: number): void {
      this.stanService.deleteStan(stanId).then(
        () => this.getStanovi()
      );
    }
}


