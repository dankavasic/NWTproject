import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Komentar } from '../model/komentar.model';
import { KomentarService } from './komentari.service';

@Component({
  selector: 'komentari-list',
  templateUrl: './komentari.component.html',
  styleUrls: ['./komentari.component.css']
})
export class KomentariComponent implements OnInit {

  komentari: Komentar[];

  subscription: Subscription;

  constructor(private komentarService: KomentarService, private router: Router) {
    this.subscription = komentarService.RegenerateData$.subscribe(() =>
      this.getKomentari()
    );
  }

  ngOnInit(): void {
    this.getKomentari();
  }

  getKomentari() {
    this.komentarService.getKomentari().then(komentari =>
      this.komentari = komentari);
  }

  gotoAdd(): void {
    this.router.navigate(['/addKomentar']);
  }

  gotoEdit(komentar: Komentar): void {
    this.router.navigate(['/editKomentar', komentar.id]);
  }

  deleteKomentar(komentariId: number): void {
    this.komentarService.deleteKomentar(komentariId).then(
      () => this.getKomentari()
    );
  }
}
