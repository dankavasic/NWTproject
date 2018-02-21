import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { async, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'

import { KorisnikDetailComponent } from './korisnik-detail.component';
import { KorisnikService } from '../korisnici/korisnik.service';
import { ActivatedRouteStub } from '../testing/router-stubs';
//import { Korisnik } from "app/model/korisnik.model";
import {Korisnik} from "../model/korisnik.model"

describe('KorisnikDetailComponent', () => {
  let componentForAdd: KorisnikDetailComponent;
  let fixture: ComponentFixture<KorisnikDetailComponent>;
  let korisnikService: any;
  let activatedRoute: any;
  let location: any;

 beforeEach(() => {
    let korisnikServiceMock = {
      getKorisnik: jasmine.createSpy('getKorisnik')
        .and.returnValue(Promise.resolve(new Korisnik({
            id: 1,
            ime: 'a123',
            korisIme: 'Petar',
            lozinka: 'Petrovic',
            uloga: 'user'            
         	}))),
      
      addKorisnik: jasmine.createSpy('addKorisnik')
          .and.returnValue(Promise.resolve()),
      editKorisnik: jasmine.createSpy('editKorisnik')
          .and.returnValue(Promise.resolve()),
      announceChange: jasmine.createSpy('announceChange') 
    };

    let locationMock = {
      back: jasmine.createSpy('back')
    };

    let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
    activatedRouteStub.testParams = { id: 1 } ; // we edit a student with id 1. Its id is in route url

    TestBed.configureTestingModule({
       declarations: [ KorisnikDetailComponent ],
       imports: [ FormsModule ],
       providers:    [ 
        {provide: KorisnikService, useValue: korisnikServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationMock} ]
    });

    fixture = TestBed.createComponent(KorisnikDetailComponent);
    componentForAdd = fixture.componentInstance;
    korisnikService = TestBed.get(KorisnikService);
    activatedRoute = TestBed.get(ActivatedRoute);
    location = TestBed.get(Location);
  }); 
  
  it('should fetch student and his enrollments on init in edit mode', fakeAsync(() => {
    componentForAdd.ngOnInit();
    expect(korisnikService.getKorisnik).toHaveBeenCalledWith(1); // we fetch student 1 since route param is 1
    tick();
    // should fetch student from service
    expect(componentForAdd.korisnik.id).toBe(1);
    expect(componentForAdd.korisnik.ime).toEqual('a123');
    expect(componentForAdd.korisnik.korisIme).toEqual('Petar');
    expect(componentForAdd.korisnik.lozinka).toEqual('Petrovic');
    expect(componentForAdd.korisnik.uloga).toEqual('user');
    

    //should display fetched student
    fixture.detectChanges(); // tell angular that data are fetched
    tick(); // initiate next cycle of binding these data to HTML components
    fixture.detectChanges(); // detect changes in the HTML components
    // assert that values in the HTML components are as expected
    let imeInput = fixture.debugElement.query(By.css('#field1c')).nativeElement;
    expect(imeInput.value).toEqual('a123');
    let korisImeInput = fixture.debugElement.query(By.css('#field2c')).nativeElement;
    expect(korisImeInput.value).toEqual('Petar');
    let lozinkaInput = fixture.debugElement.query(By.css('#field3c')).nativeElement;
    expect(lozinkaInput.value).toEqual('Petrovic');
    let ulogaInput = fixture.debugElement.query(By.css('#field4c')).nativeElement;
    expect(ulogaInput.value).toEqual('user');
  }));


  // a helper function to tell Angular that an event on the HTML page has happened
  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind data from edit fields to student', fakeAsync(() => {
      fixture.detectChanges();  // ngOnInit will be called
      tick();
      // initially, we don't have needed data in the student object
      expect(componentForAdd.korisnik.ime).not.toEqual('a345');
      expect(componentForAdd.korisnik.korisIme).not.toEqual('Petar1');
      expect(componentForAdd.korisnik.lozinka).not.toEqual('Petrovic1');

      // insert data into input fields
      let imeInput = fixture.debugElement.query(By.css('#field1c')).nativeElement;
      imeInput.value = 'a345';
      let korisImeInput = fixture.debugElement.query(By.css('#field2c')).nativeElement;
      korisImeInput.value = 'Petar1';
      let lozinkaInput = fixture.debugElement.query(By.css('#field3c')).nativeElement;
      lozinkaInput.value  = 'Petrovic1';
      let ulogaInput = fixture.debugElement.query(By.css('#field4c')).nativeElement;
      ulogaInput.value  = 'user1';

      // bind data from HTML components to the student object
      imeInput.dispatchEvent(newEvent('input')); 
      korisImeInput.dispatchEvent(newEvent('input')); 
      lozinkaInput.dispatchEvent(newEvent('input')); 

      // expect that data from HTML components are copied into the student object
      expect(componentForAdd.korisnik.ime).toEqual('a345');
      expect(componentForAdd.korisnik.korisIme).toEqual('Petar1');
      expect(componentForAdd.korisnik.lozinka).toEqual('Petrovic1');
      expect(componentForAdd.korisnik.uloga).toEqual('user1');
  }));

  it('should add korisnik', fakeAsync(() => {
    // we do not initialize component, so the route param will be ignored and we will enter the ADD mode

    componentForAdd.save();
    expect(korisnikService.addKorisnik).toHaveBeenCalled();
    tick();
    // it should announce the change
    expect(korisnikService.announceChange).toHaveBeenCalled();
    // it should go to the previous page
    expect(location.back).toHaveBeenCalled();
  }));

  it('should edit korisnik', fakeAsync(() => {
    componentForAdd.ngOnInit(); // when we call ngOnInit, route param will cause entering the EDIT mode
    componentForAdd.save();
    expect(korisnikService.editKorisnik).toHaveBeenCalled();
    tick();
    // it should announce the change
    expect(korisnikService.announceChange).toHaveBeenCalled();
    // it should go to the previous page
    expect(location.back).toHaveBeenCalled();
  }));

  it('should go back on goBack()', () => {
    componentForAdd.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
