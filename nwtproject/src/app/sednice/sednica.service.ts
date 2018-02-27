import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Sednica } from '../model/sednica.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SednicaService {
    private sedniceUrl = 'api/sednica';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getSednice(): Promise<Sednica[]> {
        const url = 'api/sednica/all';
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Sednica[])
            .catch(this.handleError);
    }
    getSednica(id: number): Promise<Sednica> {
        const url = `${this.sedniceUrl}/all/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Sednica)
            .catch(this.handleError);
    }
    addSednica(sednica: Sednica): Promise<Sednica> {
        return this.http
            .post(this.sedniceUrl, JSON.stringify(sednica), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Sednica)
            .catch(this.handleError);
    }
    editSednica(sednica: Sednica): Promise<Sednica> {
        return this.http
            .put(this.sedniceUrl, JSON.stringify(sednica), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Sednica)
            .catch(this.handleError);
    }

    deleteSednica(sednicaId: number): Promise<{}> {
        const url = `${this.sedniceUrl}/${sednicaId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }




    handleError(error: any): Promise<any> {
        console.error("Greska...", error);
        return Promise.reject(error.message || error);
    }
}
