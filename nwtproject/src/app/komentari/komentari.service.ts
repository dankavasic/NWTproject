import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Komentar } from '../model/komentar.model';
import { Kvar } from '../model/kvar.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class KomentarService {
    private komentariUrl = 'api/komentar';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getKomentari(): Promise<Komentar[]> {
        return this.http.get('api/komentar/all')
            .toPromise()
            .then(response =>
                response.json() as Komentar[])
            .catch(this.handleError);
    }

    getKomentar(id: number): Promise<Komentar> {
        const url = `${this.komentariUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Komentar)
            .catch(this.handleError);
    }

    addKomentar(komentar: Komentar): Promise<Komentar> {
        return this.http
            .post(this.komentariUrl, JSON.stringify(komentar), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Komentar)
            .catch(this.handleError);
    }

    editKomentar(komentar: Komentar): Promise<Komentar> {
        return this.http
            .put(this.komentariUrl, JSON.stringify(komentar), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Komentar)
            .catch(this.handleError);
    }

    deleteKomentar(komentarId: number): Promise<{}> {
        const url = `${this.komentariUrl}/${komentarId}`;
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