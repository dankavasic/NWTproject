import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Zapisnik } from '../model/zapisnik.model';

import 'rxjs/add/operator/toPromise';
import { Sednica } from '../model/sednica.model';

@Injectable()
export class ZapisnikService {
    private zapisniciUrl = 'api/zapisnik';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getZapisnici(): Promise<Zapisnik[]> {
        return this.http.get("api/zapisnik/all")
            .toPromise()
            .then(response =>
                response.json() as Zapisnik[])
            .catch(this.handleError);
    }

    getZapisnik(id: number): Promise<Zapisnik> {
        const url = `${this.zapisniciUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Zapisnik)
            .catch(this.handleError);
    }

    addZapisnik(zapisnik: Zapisnik): Promise<Zapisnik> {
        return this.http
            .post(this.zapisniciUrl, JSON.stringify(zapisnik), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Zapisnik)
            .catch(this.handleError);
    }

    editZapisnik(zapisnik: Zapisnik): Promise<Zapisnik> {
        return this.http
            .put(this.zapisniciUrl, JSON.stringify(zapisnik), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Zapisnik)
            .catch(this.handleError);
    }

    deleteZapisnik(zapisnikId: number): Promise<{}> {
        const url = `${this.zapisniciUrl}/${zapisnikId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

    getZapisnikSednica(zapisnikId: number): Promise<Sednica[]> {
        const url = `${this.zapisniciUrl}/${zapisnikId}/sednica`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Sednica[])
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}