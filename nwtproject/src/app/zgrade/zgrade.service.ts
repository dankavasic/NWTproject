import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Zgrada } from '../model/zgrada.model';

import 'rxjs/add/operator/toPromise';
import { Kvar } from '../model/kvar.model';
import { Stan } from '../model/stan.model';
import { Obavestenje } from '../model/obavestenje.model';
import { Sednica } from '../model/sednica.model';

@Injectable()
export class ZgradaService {
    private zgradeUrl = 'api/zgrada';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getZgrade(): Promise<Zgrada[]> {
        return this.http.get("api/zgrada/all")
            .toPromise()
            .then(response =>
                response.json() as Zgrada[])
            .catch(this.handleError);
    }

    getZgrada(id: number): Promise<Zgrada> {
        const url = `${this.zgradeUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Zgrada)
            .catch(this.handleError);
    }

    addZgrada(zgrada: Zgrada): Promise<Zgrada> {
        return this.http
            .post(this.zgradeUrl, JSON.stringify(zgrada), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Zgrada)
            .catch(this.handleError);
    }

    editZgrada(zgrada: Zgrada): Promise<Zgrada> {
        return this.http
            .put(this.zgradeUrl, JSON.stringify(zgrada), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Zgrada)
            .catch(this.handleError);
    }

    deleteZgrada(zgradaId: number): Promise<{}> {
        const url = `${this.zgradeUrl}/${zgradaId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

    getZgradaKvar(zgradaId: number): Promise<Kvar[]> {
        const url = `${this.zgradeUrl}/${zgradaId}/kvar`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Kvar[])
            .catch(this.handleError);
    }
    getZgradaSednica(zgradaId: number): Promise<Sednica[]> {
        const url = `${this.zgradeUrl}/${zgradaId}/sednica`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Sednica[])
            .catch(this.handleError);
    }

    getZgradaStan(zgradaId: number): Promise<Stan[]> {
        const url = `${this.zgradeUrl}/${zgradaId}/stan`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Stan[])
            .catch(this.handleError);
    }
    getZgradaObavestenje(zgradaId: number): Promise<Obavestenje[]> {
        const url = `${this.zgradeUrl}/${zgradaId}/obavestenje`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Obavestenje[])
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}