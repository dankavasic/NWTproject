import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Zgrada } from '../model/zgrada.model';
import { ZgradaService } from './zgrada.service';
import { KvarService } from '../kvarovi/kvarovi.service';
import { StanService } from '../stanovi/stan.service';

@Component({
  selector: 'zgrade-list',
  templateUrl: './zgrade.component.html',
  styleUrls: ['./zgrade.component.css']
})
export class ZgradeComponent implements OnInit {

  zgrada: Zgrada[];

  subscription: Subscription;

  constructor(private kvarService: KvarService,private zgradaService: ZgradaService,
    private stanService: StanService, private router: Router) {
    this.subscription = zgradaService.RegenerateData$.subscribe(() =>
      this.getZgrade()
    );
  }

  ngOnInit(): void {
    this.getZgrade();
  }

  getZgrade() {
    this.zgradaService.getZgrade().then(zgrade =>
      this.zgrada = zgrade);
  }

  gotoAdd(): void {
    this.router.navigate(['/addZgrada']);
  }

  gotoEdit(zgrada: Zgrada): void {
    this.router.navigate(['/editZgrada', zgrada.id]);
  }

  deleteZgrada(zgradeId: number): void {
    this.zgradaService.deleteZgrada(zgradeId).then(
      () => this.getZgrade()
    );
  }
}
