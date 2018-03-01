import { Zgrada } from "./zgrada.model";
import { Korisnik } from "./korisnik.model";


export class Sednica implements SednicaInterface{
    public id: number;
    public aktivna: Boolean;
	public datKreiranja: Date;
	public datZakazivanja: Date;
	public kreator : Korisnik
	public zgrada: Zgrada;
	
		
	constructor(sednicaCfg: SednicaInterface)
	{	
        this.id = sednicaCfg.id;
        this.aktivna = sednicaCfg.aktivna;
        this.datKreiranja= sednicaCfg.datKreiranja;
        this.datZakazivanja = sednicaCfg.datZakazivanja;
        this.kreator = sednicaCfg.kreator;
        this.zgrada = sednicaCfg.zgrada;
        
	
	}
}

interface SednicaInterface {
    id?: number;
    aktivna:Boolean;
    datKreiranja: Date;
    datZakazivanja : Date;
    kreator: Korisnik;
    zgrada : Zgrada;
    
}