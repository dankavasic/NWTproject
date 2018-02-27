import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Kvar } from '../model/kvar.model';

import 'rxjs/add/operator/toPromise';
import { Komentar } from '../model/komentar.model';

@Injectable()
export class KvarService {
    private kvaroviUrl = 'api/kvar';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getKvarovi(): Promise<Kvar[]> {
        return this.http.get("api/kvar/all")
            .toPromise()
            .then(response =>
                response.json() as Kvar[])
            .catch(this.handleError);
    }

    getKvar(id: number): Promise<Kvar> {
        const url = `${this.kvaroviUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Kvar)
            .catch(this.handleError);
    }

    addKvar(kvar: Kvar): Promise<Kvar> {
        return this.http
            .post(this.kvaroviUrl, JSON.stringify(kvar), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Kvar)
            .catch(this.handleError);
    }

    editKvar(kvar: Kvar): Promise<Kvar> {
        return this.http
            .put(this.kvaroviUrl, JSON.stringify(kvar), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Kvar)
            .catch(this.handleError);
    }

    deleteKvar(kvarId: number): Promise<{}> {
        const url = `${this.kvaroviUrl}/${kvarId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

    getKvarKomentar(kvarId: number): Promise<Komentar[]> {
        const url = `${this.kvaroviUrl}/${kvarId}/komentar`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Komentar[])
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}