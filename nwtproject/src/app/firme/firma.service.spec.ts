import { TestBed } from '@angular/core/testing';
import {FirmaService} from './firma.service';
import { Firma } from '../model/firma.model';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('FirmaService', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       providers:    [ 
          {provide: ConnectionBackend, useClass: MockBackend},
          {provide: RequestOptions, useClass: BaseRequestOptions},
          Http,
          FirmaService ]
    });

    this.firmaService = TestBed.get(FirmaService);
    this.backend = TestBed.get(ConnectionBackend);
    this.backend.connections.subscribe((connection: any) => 
       this.lastConnection = connection);
	});
 	
 	it('should pass simple test', () => {
	    expect(true).toBe(true);
	});

	it('getFirme() should query current service url', () => {
    this.firmaService.getFirme();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/firma$/, 'url invalid');
	}); 

	it('getFirme() should return some students', fakeAsync(() => {
     let firme: Firma[];
     this.firmaService.getFirme().then((data: Firma[]) => firme = data);
     this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify([
       	{
          id: 1,
          ime: 'firma1',
          adresa: 'Beogradska 4',
          telefon: 13567,
          email: 'firma1@gmail.com',
          webSite: 'firma1.com'          

       	},
        {
          id: 2,
          ime: 'firma2',
          adresa: 'Beogradska 3',
          telefon: 13568,
          email: 'firma2@gmail.com',
          webSite: 'firma2.com'              
        }])
     })));
     tick();
     expect(firme.length).toEqual(2, 'should contain given amount of students');
     expect(firme[0].id).toEqual(1);
     expect(firme[0].ime).toEqual('firma1');
     expect(firme[0].adresa).toEqual('Beogradska 4');
     expect(firme[0].telefon).toEqual(13567);
     expect(firme[0].email).toEqual('firma1.com');
     expect(firme[0].webSite).toEqual('firma1@gmail.com');



     expect(firme[1].id).toEqual(2);
     expect(firme[1].ime).toEqual('firma2');
     expect(firme[1].adresa).toEqual('Beogradska 3');
     expect(firme[1].telefon).toEqual(13568);       
     expect(firme[0].email).toEqual('firma1@gmail.com');
     expect(firme[0].webSite).toEqual('firma2.com');


  }));

  it('getFirma() should query url and get a student', fakeAsync(() => {
    let firma: Firma;
    this.firmaService.getFirma(1).then((s: Firma) => firma = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/firma\/1$/, 'url invalid');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'firma1',
          adresa: 'Beogradska 4',
          telefon: '13567',
          email: 'firma1@gmail.com',
          webSite: 'firma1.com'            
        })
     })));
     tick();
     expect(firma).toBeDefined();
     expect(firma.id).toEqual(1);
     expect(firma.ime).toEqual('firma1');
     expect(firma.adresa).toEqual('Beogradska 4');
     expect(firma.telefon).toEqual('13567');
     expect(firma.email).toEqual('firma1@gmail.com');
     expect(firma.webSite).toEqual('firma1.com');

  })); 

  it('addFirma() should query url and save a student', fakeAsync(() => {
    let firma: Firma = new Firma({  // a new student doesn't have an id
      ime: 'firma1',
      adresa: 'Beogradska 4',
      telefon: 13567,
      email: 'firma1@gmail.com',
      webSite: 'firma1.com' 
    });
    this.firmaService.addFirma(firma).then((s: Firma) => firma = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/firma$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Post, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'firma1',
          adresa: 'Beogradska 4',
          telefon: 13567,
          email: 'firma1@gmail.com',
          webSite: 'firma1.com'            
        })
     })));
     tick();
     expect(firma).toBeDefined();
     expect(firma.id).toEqual(1);
     expect(firma.ime).toEqual('firma1');
     expect(firma.adresa).toEqual('Beogradska 4');
     expect(firma.telefon).toEqual(13567);
     expect(firma.email).toEqual('firma1@gmail.com');
     expect(firma.webSite).toEqual('firma1.com');
  }));

  it('editFirma() should query url and edit a building', fakeAsync(() => {
    let firma: Firma = new Firma({  
      id: 1,
      ime: 'firma1',
      adresa: 'Beogradska 4',
      telefon: 13567,
      email: 'firma1@gmail.com',
      webSite: 'firma1.com'

    });
    this.firmaService.editFirma(firma).then((s: Firma) => firma = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/firma$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Put, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'firma1',
          telefon: 13567,
          email: 'firma1@gmail.com',
          webSite: 'firma1.com'            
        })
     })));
     tick();
     expect(firma).toBeDefined();
     expect(firma.id).toEqual(1);
     expect(firma.ime).toEqual('a123');
     expect(firma.telefon).toEqual(13567);
     expect(firma.email).toEqual('firma1@gmail.com');
     expect(firma.webSite).toEqual('firma1.com')
  }));

   it('deleteFirma() should query url and delete a firm', () => {
    this.firmaService.deleteFirma(1);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/firma\/1$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Delete, 'invalid http method');
  });
})