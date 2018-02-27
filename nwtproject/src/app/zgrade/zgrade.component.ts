import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Zgrada } from '../model/zgrada.model';
import { ZgradaService } from './zgrade.service';
import { KvarService } from '../kvarovi/kvarovi.service';
import { StanService } from '../stanovi/stan.service';
import { ObavestenjeService } from '../obavestenja/obavestenja.service';

@Component({
  selector: 'zgrade-list',
  templateUrl: './zgrade.component.html',
  styleUrls: ['./zgrade.component.css']
})
export class ZgradeComponent implements OnInit {

  zgrade: Zgrada[];

  subscription: Subscription;

  constructor(private zgradaService: ZgradaService,private kvarService: KvarService,
    private StanService: StanService, private obavestenjeService: ObavestenjeService, private router: Router) {
    this.subscription = kvarService.RegenerateData$.subscribe(() =>
      this.getZgrade(),
    );
  }

  ngOnInit(): void {
    this.getZgrade();
  }

  getZgrade() {
    this.zgradaService.getZgrade().then(zgrade =>
      this.zgrade = zgrade);
  }

  gotoAdd(): void {
    this.router.navigate(['/addZgrada']);
  }

  gotoEdit(zgrada: Zgrada): void {
    this.router.navigate(['/editZgrada', zgrada.id]);
  }

  deleteKvar(zgradeId: number): void {
    this.zgradaService.deleteZgrada(zgradeId).then(
      () => this.getZgrade()
    );
  }
}
