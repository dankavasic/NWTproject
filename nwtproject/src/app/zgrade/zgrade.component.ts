import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Zgrada } from '../model/zgrada.model';
import { ZgradaService } from './zgrada.service';

@Component({
  selector: 'zgrade-list',
  templateUrl: './zgrade.component.html',
  styleUrls: ['./zgrade.component.css']
})
export class ZgradeComponent implements OnInit {

  zgrade: Zgrada[];

  subscription: Subscription;

  constructor(private zgradaService: ZgradaService, private router: Router) {
    this.subscription = zgradaService.RegenerateData$.subscribe(() =>
      this.getZgrade()
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

  deleteZgrada(zgradaId: number): void {
    this.zgradaService.deleteZgrada(zgradaId).then(
      () => this.getZgrade()
    );
  }
}
