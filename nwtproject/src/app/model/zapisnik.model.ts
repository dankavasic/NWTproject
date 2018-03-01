import { Zgrada } from './zgrada.model';
import { Korisnik } from './korisnik.model';
import { Sednica } from './sednica.model';

export class Zapisnik implements ZapisnikInterface{
	id?: number;
	datKreiranja: Date;	
    opis: string;
    kreator: Korisnik;
    zgrada: Zgrada;
    sednica: Sednica;

	constructor(zapisnikCfg: ZapisnikInterface)
	{	
        this.id = zapisnikCfg.id;
        this.datKreiranja = zapisnikCfg.datKreiranja;
        this.opis = zapisnikCfg.opis;
        this.kreator = zapisnikCfg.kreator;
        this.zgrada = zapisnikCfg.zgrada;
        this.sednica = zapisnikCfg.sednica;				
	}
}

interface ZapisnikInterface{
    id?: number;
    datKreiranja : Date;
    opis:string;
    kreator : Korisnik;
    zgrada : Zgrada;
    sednica : Sednica;
}