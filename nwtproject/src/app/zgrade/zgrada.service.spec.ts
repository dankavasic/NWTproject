import { TestBed } from '@angular/core/testing';
import {ZgradaService} from './zgrada.service';
import { Zgrada } from '../model/zgrada.model';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('ZgradaService', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       providers:    [ 
          {provide: ConnectionBackend, useClass: MockBackend},
          {provide: RequestOptions, useClass: BaseRequestOptions},
          Http,
          ZgradaService ]
    });

    this.zgradaService = TestBed.get(ZgradaService);
    this.backend = TestBed.get(ConnectionBackend);
    this.backend.connections.subscribe((connection: any) => 
       this.lastConnection = connection);
	});
 	
 	it('should pass simple test', () => {
	    expect(true).toBe(true);
	});

	it('getZgrade() should query current service url', () => {
    this.zgradaService.getZgrade();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/zgrada$/, 'url invalid');
	}); 

	it('getZgrade() should return some students', fakeAsync(() => {
     let zgrade: Zgrada[];
     this.zgradaService.getZgrade().then((data: Zgrada[]) => zgrade = data);
     this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify([
       	{
          id: 1,
          ime: 'zgrada 1',
          adresa: 'Beogradska 4',
          vlasnik: 'Petrovic'            
       	},
        {
          id: 2,
          ime: 'zgrada 2',
          adresa: 'Beogradska 3',
          vlasnik: 'Popovic'            
        }])
     })));
     tick();
     expect(zgrade.length).toEqual(2, 'should contain given amount of students');
     expect(zgrade[0].id).toEqual(1);
     expect(zgrade[0].ime).toEqual('zgrada 1');
     expect(zgrade[0].adresa).toEqual('Beogradska 4');
     expect(zgrade[0].vlasnik).toEqual('Petrovic');

     expect(zgrade[1].id).toEqual(2);
     expect(zgrade[1].ime).toEqual('zgrada 2');
     expect(zgrade[1].adresa).toEqual('Beogradska 3');
     expect(zgrade[1].vlasnik).toEqual('Popovic');       
  }));

  it('getZgrada() should query url and get a student', fakeAsync(() => {
    let zgrada: Zgrada;
    this.zgradaService.getZgrada(1).then((s: Zgrada) => zgrada = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/zgrada\/1$/, 'url invalid');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'zgrada 1',
          adresa: 'Beogradska 4',
          vlasnik: 'Petrovic'            
        })
     })));
     tick();
     expect(zgrada).toBeDefined();
     expect(zgrada.id).toEqual(1);
     expect(zgrada.ime).toEqual('zgrada 1');
     expect(zgrada.adresa).toEqual('Beogradska 4');
     expect(zgrada.vlasnik).toEqual('Petrovic');

  })); 

  it('addZgrada() should query url and save a student', fakeAsync(() => {
    let zgrada: Zgrada = new Zgrada({  // a new student doesn't have an id
      ime: 'zgrada 1',
      adresa: 'Beogradska 4',
      vlasnik: 'Petrovic' 
    });
    this.zgradaService.addZgrada(zgrada).then((s: Zgrada) => zgrada = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/zgrada$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Post, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'zgrada 1',
          adresa: 'Beogradska 4',
          vlasnik: 'Petrovic'            
        })
     })));
     tick();
     expect(zgrada).toBeDefined();
     expect(zgrada.id).toEqual(1);
     expect(zgrada.ime).toEqual('zgrada 1');
     expect(zgrada.adresa).toEqual('Beogradska 4');
     expect(zgrada.vlasnik).toEqual('Petrovic');
  }));

  it('editZgrada() should query url and edit a building', fakeAsync(() => {
    let zgrada: Zgrada = new Zgrada({  
      id: 1,
      ime: 'zgrada 1',
      adresa: 'Beogradska 4',
      vlasnik: 'Petrovic' 
    });
    this.zgradaService.editZgrada(zgrada).then((s: Zgrada) => zgrada = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/zgrada$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Put, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          ime: 'zgrada 1',
          vlasnik: 'Petrovic'            
        })
     })));
     tick();
     expect(zgrada).toBeDefined();
     expect(zgrada.id).toEqual(1);
     expect(zgrada.ime).toEqual('a123');
     expect(zgrada.vlasnik).toEqual('Petrovic');
  }));

   it('deleteZgrada() should query url and delete a building', () => {
    this.zgradaService.deleteZgrada(1);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/zgrada\/1$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Delete, 'invalid http method');
  });
})