import { TestBed } from '@angular/core/testing';
import {KorisnikService} from './korisnik.service';
import { Korisnik } from '../model/korisnik.model';
//import { Enrollment} from '../model/enrollment.model';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('KorisnikService', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       providers:    [ 
          {provide: ConnectionBackend, useClass: MockBackend},
          {provide: RequestOptions, useClass: BaseRequestOptions},
          Http,
          KorisnikService ]
    });

    this.KorisnikService = TestBed.get(KorisnikService);
    this.backend = TestBed.get(ConnectionBackend);
    this.backend.connections.subscribe((connection: any) => 
       this.lastConnection = connection);
	});
 	
 	it('should pass simple test', () => {
	    expect(true).toBe(true);
	});

	it('getKorisnici() should query current service url', () => {
    this.korisnikService.getKorisnici();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/korisnici$/, 'url invalid');
	}); 

	it('getKorisnici() should return some students', fakeAsync(() => {
     let korisnici: Korisnik[];
     this.korisnikService.getKorisnici().then((data: Korisnik[]) => korisnici = data);
     this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify([
       	{
          id: 1,
          ime: 'a123',
          korisIme: 'Petar',
          lozinka: 'Petrovic',
          uloga: 'user'            
       	},
        {
          id: 2,
          ime: 'b456',
          korisIme: 'Marko',
          lozinka: 'Markovic',
          uloga: 'user'           
        }])
     })));
     tick();
     expect(korisnici.length).toEqual(2, 'should contain given amount of students');
     expect(korisnici[0].id).toEqual(1);
     expect(korisnici[0].ime).toEqual('a123');
     expect(korisnici[0].korisIme).toEqual('Petar');
     expect(korisnici[0].lozinka).toEqual('Petrovic');
     expect(korisnici[0].uloga).toEqual('user');

     expect(korisnici[1].id).toEqual(2);
     expect(korisnici[1].ime).toEqual('b456');
     expect(korisnici[1].korisIme).toEqual('Marko');
     expect(korisnici[1].lozinka).toEqual('Markovic');
     expect(korisnici[1].uloga).toEqual('user')       
  }));

  it('getKorisnik() should query url and get a student', fakeAsync(() => {
    let korisnik: Korisnik;
    this.korisnikService.getKorisnik(1).then((s: Korisnik) => korisnik = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/korisnik\/1$/, 'url invalid');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'a123',
          korisIme: 'Petar',
          lozinka: 'Petrovic'            
        })
     })));
     tick();
     expect(korisnik).toBeDefined();
     expect(korisnik.id).toEqual(1);
     expect(korisnik.ime).toEqual('a123');
     expect(korisnik.korisIme).toEqual('Petar');
     expect(korisnik.lozinka).toEqual('Petrovic');
     expect(korisnik.uloga).toEqual('user');

  })); 

  it('addKorisnik() should query url and save a student', fakeAsync(() => {
    let korisnik: Korisnik = new Korisnik({  // a new student doesn't have an id
      ime: 'a123',
      korisIme: 'Petar',
      lozinka: 'Petrovic',
      uloga: 'user' 
    });
    this.korisnikService.addKorisnik(korisnik).then((s: Korisnik) => korisnik = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/korisnici$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Post, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'a123',
          korisIme: 'Petar',
          lozinka: 'Petrovic',
          uloga: 'user'            
        })
     })));
     tick();
     expect(korisnik).toBeDefined();
     expect(korisnik.id).toEqual(1);
     expect(korisnik.ime).toEqual('a123');
     expect(korisnik.korisIme).toEqual('Petar');
     expect(korisnik.lozinka).toEqual('Petrovic');
     expect(korisnik.uloga).toEqual('user')
  }));

  it('editKorisnik() should query url and edit a student', fakeAsync(() => {
    let korisnik: Korisnik = new Korisnik({  
      id: 1,
      ime: 'a123',
      korisIme: 'Petar',
      lozinka: 'Petrovic',
      uloga: 'user' 
    });
    this.korisnikService.editKorisnik(korisnik).then((s: Korisnik) => korisnik = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/korisnici$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Put, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'a123',
          korisIme: 'Petar',
          lozinka: 'Petrovic',
          uloga: 'user'            
        })
     })));
     tick();
     expect(korisnik).toBeDefined();
     expect(korisnik.id).toEqual(1);
     expect(korisnik.ime).toEqual('a123');
     expect(korisnik.korisIme).toEqual('Petar');
     expect(korisnik.lozinka).toEqual('Petrovic');
     expect(korisnik.uloga).toEqual('user')
  }));

   it('deleteKorisnik() should query url and delete a student', () => {
    this.korisnikService.deleteKorisnik(1);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/korisnici\/1$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Delete, 'invalid http method');
  });


  it('announceChange() should emit the event RegenerateData', fakeAsync(() => {
    let counter: number = 0;
    this.korisnikService.RegenerateData$.subscribe(() =>  counter++
    );

    this.korisnikService.announceChange();
    tick();
    this.korisnikService.announceChange();
    tick();

    expect(counter).toBe(2);
  }));

  it ('handleError() should log error and reject a promise', fakeAsync(() => {
    spyOn(this.korisnikService, 'handleError').and.callThrough();
    spyOn(console, 'error'); // just spy on it without calling
    let rejected: boolean = false;

    this.korisnikService.handleError(new Error('ERROR')).then(null, () => {
      rejected = true;
    });

    expect(console.error).toHaveBeenCalled();

    tick();
    expect(rejected).toBe(true);
  })); 

  it('should call handleError if getStudents produces an error', fakeAsync(() => {     
    spyOn(this.korisnikService, 'handleError');
    
    this.korisnikService.getKorisnici();
    
    this.lastConnection.mockError(new Error());

    tick();

    expect(this.korisnikService.handleError).toHaveBeenCalled();
  }));


  /*
   * A more general solution for testing error handlers for all methods uniformly
   */   

  it('should call handleError if any method with HTTP call produce an error', () => {

    // this function checks multiple methods
    let testServiceMethodsForErrors = function(methods: Array<Function>): void  {

      // this function checks a single method
      let checkIsErrorHandlerCalled = function(method: Function): void {
        spyOn(this.korisnikService, 'handleError');            
        method.apply(this.korisnikService); // call the method on the this.korisnikService object         
        this.lastConnection.mockError(new Error());
        tick();
        // if an error occurs, we expect that handleError has been called
        expect(this.korisnikService.handleError).toHaveBeenCalled();
      };

      for (let method of methods) {
        fakeAsync((method: Function) => {
          checkIsErrorHandlerCalled(method);
        });
      }     
    };

    // test error handler for multiple methods organized in an array
    testServiceMethodsForErrors([this.korisnikService.getKorisnici, this.korisnikService.getKorisnik,
      this.korisnikService.addKorisnik, this.korisnikService.editKorisnik, this.korisnikService.deleteKorisnik]);
  });
});