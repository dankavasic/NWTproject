import { Korisnik } from './korisnik.model';

export class Firma implements FirmaInterface{
    id: number;
	ime: string;
	adresa: string;
	telefon: number;
	webSite: string;
	email: string;
	vlasnik: Korisnik;
    
    constructor(firmaCfg: FirmaInterface)
	{	
		this.id = firmaCfg.id;
		this.ime = firmaCfg.ime;
		this.adresa = firmaCfg.adresa;
		this.telefon = firmaCfg.telefon;
		this.webSite = firmaCfg.webSite;
		this.email = firmaCfg.email;
		this.vlasnik = firmaCfg.vlasnik;
	}
}

interface FirmaInterface {
	id?: number;
	ime: string;
	adresa: string;
	telefon: number;
	webSite: string;
	email: string;
	vlasnik:Korisnik;
}