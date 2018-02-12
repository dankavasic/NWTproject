import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Firma } from '../model/firma.model';
import { FirmaService } from './firma.service';

@Component({
  selector: 'firme-list',
  templateUrl: './firme.component.html',
  styleUrls: ['./firme.component.css']
})
export class FirmeComponent implements OnInit {

  firme: Firma[];

  subscription: Subscription;

  constructor(private firmaService: FirmaService, private router: Router) {
    this.subscription = firmaService.RegenerateData$.subscribe(() =>
      this.getFirme()
    );
  }

  ngOnInit(): void {
    this.getFirme();
  }

  getFirme() {
    this.firmaService.getFirme().then(firme =>
      this.firme = firme);
  }

  gotoAdd(): void {
    this.router.navigate(['/addFirma']);
  }

  gotoEdit(firma: Firma): void {
    this.router.navigate(['/editFirma', firma.id]);
  }

  deleteFirma(firmaId: number): void {
    this.firmaService.deleteFirma(firmaId).then(
      () => this.getFirme()
    );
  }
}
