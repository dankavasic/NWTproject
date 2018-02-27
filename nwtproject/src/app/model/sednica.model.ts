import { Zgrada } from "./zgrada.model";
import { Korisnik } from "./korisnik.model";


export class Sednica implements SednicaInterface{
	public id: number;
	public datKreiranja: Date;
	public datZakazivanja: Date;
	public aktivna: Boolean;
	public zgrada: Zgrada;
	public kreator : Korisnik
		
	constructor(sednicaCfg: SednicaInterface)
	{	
        this.id = sednicaCfg.id;
        this.datKreiranja= sednicaCfg.datKreiranja;
        this.datZakazivanja = sednicaCfg.datZakazivanja;
        this.aktivna = sednicaCfg.aktivna;
        this.zgrada = sednicaCfg.zgrada;
        this.kreator = sednicaCfg.kreator;
	
	}
}

interface SednicaInterface {
	id?: number;
    datKreiranja: Date;
    datZakazivanja : Date;
    aktivna:Boolean;
    zgrada : Zgrada;
    kreator: Korisnik;
}