import { Korisnik } from './korisnik.model';

export class Zgrada implements ZgradaInterface{
	id?: number;
    adresa: string;
    brNaseljenih: number;
    brStanova: number;
    ime: string;
    vlasnik: Korisnik;
    
	constructor(zgradaCfg: ZgradaInterface)
	{	
        this.id = zgradaCfg.id;
        this.adresa = zgradaCfg.adresa;
        this.brNaseljenih = zgradaCfg.brNaseljenih;
        this.brStanova = zgradaCfg.brStanova;
        this.ime = zgradaCfg.ime;
        this.vlasnik = zgradaCfg.vlasnik;
	}
}

interface ZgradaInterface{
    id?: number;
    adresa: string;
    brNaseljenih: number;
    brStanova: number;
    ime: string;
    vlasnik: Korisnik;
}