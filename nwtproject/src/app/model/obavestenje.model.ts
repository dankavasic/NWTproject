import { Zgrada } from './zgrada.model';
import { Korisnik } from './korisnik.model';

export class Obavestenje implements ObavestenjeInterface{
	id?: number;
	datKreiranja: Date;
	ime: string;
    opis: string;
    kreator: Korisnik;
    zgrada: Zgrada;
    
	constructor(obavestenjeCfg: ObavestenjeInterface)
	{	
        this.id = obavestenjeCfg.id;
        this.datKreiranja = obavestenjeCfg.datKreiranja;
        this.ime = obavestenjeCfg.ime;
        this.opis = obavestenjeCfg.opis;
        this.kreator = obavestenjeCfg.kreator;
        this.zgrada = obavestenjeCfg.zgrada;				
	}
}

interface ObavestenjeInterface{
    id?: number;
    datKreiranja: Date;
	ime: string;
	opis: string;
    kreator: Korisnik;
    zgrada: Zgrada;
}