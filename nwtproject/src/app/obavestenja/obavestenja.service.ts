import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Obavestenje } from '../model/obavestenje.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ObavestenjeService {
    private obavestenjaUrl = 'api/obavestenje';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getObavestenja(): Promise<Obavestenje[]> {
        return this.http.get("api/obavestenje/all")
            .toPromise()
            .then(response =>
                response.json() as Obavestenje[])
            .catch(this.handleError);
    }

    getObavestenje(id: number): Promise<Obavestenje> {
        const url = `${this.obavestenjaUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Obavestenje)
            .catch(this.handleError);
    }

    addObavestenje(obavestenje: Obavestenje): Promise<Obavestenje> {
        return this.http
            .post(this.obavestenjaUrl, JSON.stringify(obavestenje), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Obavestenje)
            .catch(this.handleError);
    }

    editObavestenje(obavestenje: Obavestenje): Promise<Obavestenje> {
        return this.http
            .put(this.obavestenjaUrl, JSON.stringify(obavestenje), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Obavestenje)
            .catch(this.handleError);
    }

    deleteObavestenje(obavestenjeId: number): Promise<{}> {
        const url = `${this.obavestenjaUrl}/${this.obavestenjaUrl}`;
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