import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { ZgradaService } from '../zgrade/zgrade.service';
import {Korisnik} from '../model/korisnik.model';
import {Zgrada} from '../model/zgrada.model';

import 'rxjs/add/operator/switchMap';
import { Kvar } from '../model/kvar.model';
import { KvarService } from '../kvarovi/kvarovi.service';
import { KorisnikService } from '../korisnici/korisnik.service';
import { Stan } from '../model/stan.model';
import { StanService } from '../stanovi/stan.service';
import { Obavestenje } from '../model/obavestenje.model';
import { ObavestenjeService } from '../obavestenja/obavestenja.service';
import { Sednica } from '../model/sednica.model';
import { SednicaService } from '../sednice/sednica.service';

@Component({
  selector: 'app-zgrada-detail',
  templateUrl: './zgrada-detail.component.html',
  styleUrls: ['./zgrada-detail.component.css']
})
export class ZgradaDetailComponent implements OnInit {

  zgrada: Zgrada;

  kvarovi: Kvar[];
  stanovi: Stan[];
  obavestenja: Obavestenje[];
  sednice: Sednica[];

  mode: string;

  constructor(private kvarService: KvarService, private zgradaService: ZgradaService, private sednicaService: SednicaService,
    private korisnikService: KorisnikService, private stanService: StanService, private obavestenjeService: ObavestenjeService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    kvarService.RegenerateData$.subscribe(() =>
      this.getKvarovi()
    )
    sednicaService.RegenerateData$.subscribe(() =>
      this.getSednice()
    )
    stanService.RegenerateData$.subscribe(() =>
      this.getStanovi()
    )
    obavestenjeService.RegenerateData$.subscribe(() =>
      this.getObavestenja()
    )
    this.zgrada = new Zgrada({ // if we add a new course, create an empty course
    
      adresa: '',
      brNaseljenih: null,
      brStanova: null,
      ime: '',
      vlasnik: new Korisnik({
        ime: '',
        lozinka: '',
        korisIme: '',
        uloga: '',
      })
    });
    this.mode = 'ADD';
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT';
      // fetch course if we edit the existing course
      this.route.params
        .switchMap((params: Params) =>
          this.zgradaService.getZgrada(+params['id']))
        .subscribe(zgrada => {
          this.zgrada = zgrada;
          this.getKvarovi();
          this.getStanovi();
          this.getObavestenja();
          this.getSednice();

        });
    }
  }

  private getKvarovi(): void {
    this.zgradaService.getZgradaKvar(this.zgrada.id).then(kvarovi =>
      this.kvarovi = kvarovi);
  }

  private getSednice(): void {
    this.zgradaService.getZgradaSednica(this.zgrada.id).then(sednice =>
      this.sednice = sednice);
  }

  private getStanovi(): void {
    this.zgradaService.getZgradaStan(this.zgrada.id).then(stanovi =>
      this.stanovi = stanovi);
  }

  private getObavestenja(): void {
    this.zgradaService.getZgradaObavestenje(this.zgrada.id).then(obavestenja =>
      this.obavestenja = obavestenja);
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

  gotoAddKvar(): void {
    this.router.navigate(['/addKvar'], { queryParams: { zgradaId: this.zgrada.id } });
  }
  gotoEditkvar(kvar: Kvar): void {
    this.router.navigate(['/editKvar', kvar.id],{ queryParams: { zgradaId: this.zgrada.id } });
  }
  deleteKvar(kvarId: number): void {
    this.kvarService.deleteKvar(kvarId).then(
      () => this.getKvarovi()
    );
  }

  gotoAddSednica(): void {
    this.router.navigate(['/addSednica'], { queryParams: { zgradaId: this.zgrada.id } });
  }
  gotoEditSednica(sednica: Sednica): void {
    this.router.navigate(['/editSednica', sednica.id],{ queryParams: { zgradaId: this.zgrada.id } });
  }
  deleteSednica(sednicaId: number): void {
    this.sednicaService.deleteSednica(sednicaId).then(
      () => this.getSednice()
    );
  }

  gotoAddStan(): void {
    this.router.navigate(['/addStan'], { queryParams: { zgradaId: this.zgrada.id } });
  }
  gotoEditStan(stan: Stan): void {
    this.router.navigate(['/editStan', stan.id],{ queryParams: { zgradaId: this.zgrada.id } });
  }
  deleteStan(stanId: number): void {
    this.stanService.deleteStan(stanId).then(
      () => this.getStanovi()
    );
  }

  gotoAddObavestenje(): void {
    this.router.navigate(['/addObavestenje'], { queryParams: { zgradaId: this.zgrada.id } });
  }
  gotoEditObavestenje(obavestenje: Obavestenje): void {
    this.router.navigate(['/editObavestenje', obavestenje.id],{ queryParams: { zgradaId: this.zgrada.id } });
  }
  deleteObavestenje(obavestenjeId: number): void {
    this.obavestenjeService.deleteObavestenje(obavestenjeId).then(
      () => this.getObavestenja()
    );
  }
}
