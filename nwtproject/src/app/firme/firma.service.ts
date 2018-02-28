import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Firma } from '../model/firma.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FirmaService {
    private firmeUrl = 'api/firma';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getFirme(): Promise<Firma[]> {
        const url = 'api/firma/all';
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Firma[])
            .catch(this.handleError);
    }

    getFirma(id: number): Promise<Firma> {
        const url = `${this.firmeUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Firma)
            .catch(this.handleError);
    }

    addFirma(firma: Firma): Promise<Firma> {
        return this.http
            .post(this.firmeUrl, JSON.stringify(firma), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Firma)
            .catch(this.handleError);
    }

    editFirma(firma: Firma): Promise<Firma> {
        return this.http
            .put(this.firmeUrl, JSON.stringify(firma), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Firma)
            .catch(this.handleError);
    }

    deleteFirma(firmaId: number): Promise<{}> {
        const url = `${this.firmeUrl}/${firmaId}`;
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