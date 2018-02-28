import { Korisnik } from "./korisnik.model";
import {Sednica} from "./sednica.model";


export class Stavka implements StavkaInterface{
	public id: number;
    public datKreiranja: Date;
    public ime: string;
    public opis: string;
    public kreator: Korisnik;
    public sednica: Sednica;


		
	constructor(stavkaCfg: StavkaInterface)
	{	
        this.id = stavkaCfg.id;
        this.datKreiranja = stavkaCfg.datKreiranja;
        this.ime = stavkaCfg.ime;
        this.opis = stavkaCfg.opis;
        this.kreator = stavkaCfg.kreator;
        this.sednica = stavkaCfg.sednica;

	}
}

interface StavkaInterface {
	id?: number;
    datKreiranja: Date;
    ime: string;
    opis: string;
    kreator: Korisnik;
    sednica: Sednica;

}