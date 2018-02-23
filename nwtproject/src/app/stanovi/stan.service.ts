import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Stan } from '../model/stan.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StanService {
    private stanoviUrl = 'api/stan';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getStanovi(): Promise<Stan[]> {
        const url = 'api/stan/all';
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Stan[])
            .catch(this.handleError);
    }
    getStan(id: number): Promise<Stan> {
        const url = `${this.stanoviUrl}/all/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Stan)
            .catch(this.handleError);
    }
    addStan(stan: Stan): Promise<Stan> {
        return this.http
            .post(this.stanoviUrl, JSON.stringify(stan), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Stan)
            .catch(this.handleError);
    }
    editStan(stan: Stan): Promise<Stan> {
        const url = `${this.stanoviUrl}/all/${stan.id}`;
        return this.http
            .put(this.stanoviUrl, JSON.stringify(stan), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Stan)
            .catch(this.handleError);
    }

    deleteStan(stanId: number): Promise<{}> {
        const url = `${this.stanoviUrl}/${stanId}`;
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
