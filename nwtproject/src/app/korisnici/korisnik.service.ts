import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Korisnik } from '../model/korisnik.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class KorisnikService {
    private korisniciUrl = 'api/korisnik_servisa';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getKorisnici(): Promise<Korisnik[]> {
        const url = 'api/korisnik_servisa/all';
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Korisnik[])
            .catch(this.handleError);
    }

    getKorisnik(id: number): Promise<Korisnik> {
        const url = `${this.korisniciUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Korisnik)
            .catch(this.handleError);
    }

    addKorisnik(korisnik: Korisnik): Promise<Korisnik> {
        return this.http
            .post(this.korisniciUrl, JSON.stringify(korisnik), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Korisnik)
            .catch(this.handleError);
    }

    editKorisnik(korisnik: Korisnik): Promise<Korisnik> {
        return this.http
            .put(this.korisniciUrl, JSON.stringify(korisnik), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Korisnik)
            .catch(this.handleError);
    }

    deleteKorisnik(korisnikId: number): Promise<{}> {
        const url = `${this.korisniciUrl}/${korisnikId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

   /* //getStudentEnrollments(studentId: number): Promise<Enrollment[]> {
        const url = `${this.studentsUrl}/${studentId}/courses`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Enrollment[])
            .catch(this.handleError);
}*/

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}