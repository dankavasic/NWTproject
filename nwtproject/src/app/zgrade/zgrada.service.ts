import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Zgrada } from '../model/zgrada.model';

import 'rxjs/add/operator/toPromise';

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
        return this.http.get(this.zgradeUrl)
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
    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}