
import { DatePipe } from '@angular/common';import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import { SednicaService } from '../sednice/sednica.service';
import { Sednica } from '../model/sednica.model';


import 'rxjs/add/operator/switchMap';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Zgrada } from '../model/zgrada.model';
import { Korisnik } from '../model/korisnik.model';
import { ZgradaService } from '../zgrade/zgrade.service';
import { Zapisnik } from '../model/zapisnik.model';
import { ZapisnikService } from '../zapisnici/zapisnici.service';


@Component({
  selector: 'app-sednica-detail',
  templateUrl: './sednica-detail.component.html',
  styleUrls: ['./sednica-detail.component.css']
})
export class SednicaDetailComponent implements OnInit {
  ngbDatKreiranja: NgbDateStruct;
  ngbDatZakazivanja: NgbDateStruct;

 sednica: Sednica;
 zapisnici: Zapisnik[];


  mode: string='ADD';    

  constructor(private zgradaService: ZgradaService, private sednicaService: SednicaService,
    private zapisnikService : ZapisnikService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    zapisnikService.RegenerateData$.subscribe(()=>
      this.getZapisnici()
    )

      this.sednica = new Sednica({ // if we add a new student, create an empty student 
        aktivna: false,
        datKreiranja: null,
        datZakazivanja: null,
        kreator: new Korisnik({
          ime: '',
          lozinka: '',
          korisIme: '',
          uloga: '',
        }),  
        zgrada : new Zgrada({
            ime: '',
            adresa: '',
            brStanova: null,
            brNaseljenih: null,
            vlasnik: new Korisnik({
              ime: '',
              lozinka: '',
              korisIme: '',
              uloga: '',
            })
          })
      });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.sednicaService.getSednica(+params['id'])) // convert to number
        .subscribe(sednica => {
          this.sednica = sednica;
          this.getZapisnici();
          }
        );

        this.route.queryParams.subscribe(params =>
          this.zgradaService.getZgrada(params['zgradaId'])
            .then(zgrada => 
              this.sednica.zgrada = zgrada 
            ))
    } 
  }

 private getZapisnici(): void {
    this.sednicaService.getSednicaZapisnik(this.sednica.id).then(zapisnici =>
      this.zapisnici = zapisnici);
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.sednica.datKreiranja = new Date(this.ngbDatKreiranja.year, this.ngbDatKreiranja.month-1,this.ngbDatKreiranja.day);
    this.sednica.datZakazivanja = new Date(this.ngbDatZakazivanja.year, this.ngbDatZakazivanja.month-1, this.ngbDatZakazivanja.day);

    this.sednicaService.addSednica(this.sednica)
      .then(sednica => {
        this.sednicaService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.sednicaService.editSednica(this.sednica)
      .then(sednica => {
        this.sednicaService.announceChange();
        this.goBack();
      });
  }


  gotoAddZapisnik(): void {
    this.router.navigate(['/addZapisnik'], { queryParams: { sednicaId: this.sednica.id } });
  }

  gotoEditzapisnik(zapisnik: Zapisnik): void {
    this.router.navigate(['/editZapisnik', zapisnik.id],{ queryParams: { sednicaId: this.sednica.id } });
  }
  deleteZapisnik(zapisnikId: number): void {
    this.zapisnikService.deleteZapisnik(zapisnikId).then(
      () => this.getZapisnici()
    );
  }

  goBack(): void {
    this.location.back();
  }



}
