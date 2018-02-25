import { Kvar } from './kvar.model';
import { Korisnik } from './korisnik.model';
import {Firma} from './firma.model';

export class Komentar implements KomentarInterface{
	id?: number;
	datKreiranja: Date;	
    text: string;
    kreator: Korisnik;
    kvar: Kvar;

	constructor(komentarCfg: KomentarInterface)
	{	
        this.id = komentarCfg.id;
        this.datKreiranja = komentarCfg.datKreiranja;
        this.text = komentarCfg.text;
        this.kreator = komentarCfg.kreator;
        this.kvar = komentarCfg.kvar;		
	}
}

interface KomentarInterface{
	id?: number;
	datKreiranja: Date;
    text: string;
    kreator: Korisnik;
    kvar: Kvar;
}