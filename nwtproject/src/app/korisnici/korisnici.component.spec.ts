import {ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'
import {async, fakeAsync, tick} from '@angular/core/testing';

import { KorisniciComponent } from './korisnici.component';
import { KorisnikService } from './korisnik.service';
import { Korisnik } from '../model/korisnik.model';

describe('KorisnikComponent', () => {
  let component: KorisniciComponent;
  let fixture: ComponentFixture<KorisniciComponent>;
  let korisnikService: any;
  let router: any;

  beforeEach(() => {
    let korisnikServiceMock = {
      getKorisnici: jasmine.createSpy('getKorisnici')
          .and.returnValue(Promise.resolve([{}, {}, {}])), 
      deleteKorisnik: jasmine.createSpy('deleteKorisnik')
        .and.returnValue(Promise.resolve()),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
       declarations: [ KorisniciComponent ],
       providers:    [ {provide: KorisnikService, useValue: korisnikServiceMock },
                       { provide: Router, useValue: routerMock } ]
    });

    fixture = TestBed.createComponent(KorisniciComponent);
    component    = fixture.componentInstance;
    korisnikService = TestBed.get(KorisnikService);
    router = TestBed.get(Router);
  });


  it('should fetch the students list on init', async(() => {
    component.ngOnInit();
    // should subscribe on RegenerateData
    expect(korisnikService.RegenerateData$.subscribe).toHaveBeenCalled();
    expect(korisnikService.getKorisnici).toHaveBeenCalled();

    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        expect(component.korisnici.length).toBe(3); // mock studentService returned 3 empty objects
        let elements: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
        expect(elements.length).toBe(4); // header tr plus one tr for each student
      });
  }));

  it('should navigate to add page', () => {
    component.gotoAdd();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/addKorisnik']);
  });

  it('should navigate to the edit page', () => {
    let korisnik: Korisnik = new Korisnik({  
        id: 3,
        ime: 'a123',
        korisIme: 'Petar',
        lozinka: 'Petrovic',
        uloga: 'user'
      });
    component.gotoEdit(korisnik);
    expect(router.navigate).toHaveBeenCalledWith(
      ['/editKorisnik', 3]);
  });

  it ('should call deleteKorisnik', () => {
    component.deleteKorisnik(1);

    expect(korisnikService.deleteKorisnik).toHaveBeenCalledWith(1);    
  }); 

});
