import { Zgrada } from './zgrada.model';
import { Korisnik } from './korisnik.model';
import {Firma} from './firma.model';

export class Kvar implements KvarInterface{
	id?: number;
	datKreiranja: Date;
	datZakazivanja: Date;	
    datPopravke: Date;
    ime: string;
    opis: string;
    popravljen: boolean;
    kreator: Korisnik;
    zgrada: Zgrada;
    radnik: Korisnik;

	constructor(kvarCfg: KvarInterface)
	{	
        this.id = kvarCfg.id;
        this.ime = kvarCfg.ime;
        this.datKreiranja = kvarCfg.datKreiranja;
        this.datZakazivanja = kvarCfg.datZakazivanja;
        this.datPopravke = kvarCfg.datPopravke;
        this.opis = kvarCfg.opis;
        this.popravljen = kvarCfg.popravljen;
        this.kreator = kvarCfg.kreator;
        this.radnik = kvarCfg.radnik;
        this.zgrada = kvarCfg.zgrada;				
	}
}

interface KvarInterface{
    id?: number;
    ime: string;
	datKreiranja: Date;
	datZakazivanja: Date;	
    datPopravke: Date;
    opis: string;
    popravljen: boolean;
    kreator: Korisnik;
    zgrada: Zgrada;
    radnik: Korisnik;
}