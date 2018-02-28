import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Stavka } from '../model/stavka.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StavkaService {
    private stavkeUrl = 'api/stavka';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getStavke(): Promise<Stavka[]> {
        const url = 'api/stavka/all';
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Stavka[])
            .catch(this.handleError);
    }
    getStavka(id: number): Promise<Stavka> {
        const url = `${this.stavkeUrl}/all/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Stavka)
            .catch(this.handleError);
    }
    addStavka(stavka: Stavka): Promise<Stavka> {
        return this.http
            .post(this.stavkeUrl, JSON.stringify(stavka), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Stavka)
            .catch(this.handleError);
    }
    editStavka(stavka: Stavka): Promise<Stavka> {
        return this.http
            .put(this.stavkeUrl, JSON.stringify(stavka), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Stavka)
            .catch(this.handleError);
    }

    deleteStavka(stavkaId: number): Promise<{}> {
        const url = `${this.stavkeUrl}/${stavkaId}`;
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
