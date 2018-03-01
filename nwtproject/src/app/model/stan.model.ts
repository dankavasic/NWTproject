import { Korisnik } from "./korisnik.model";
import { Zgrada } from "./zgrada.model";

export class Stan implements StanInterface{
    public id: number;
	public adresa : string;
	public brStanovnika : string;
	public ime: string;
	public vlasnik : Korisnik;
	public zgrada : Zgrada;
	
    
    constructor(stanCfg: StanInterface)
	{	
		this.id = stanCfg.id;
		this.adresa = stanCfg.adresa;
		this.brStanovnika = stanCfg.brStanovnika;
		this.ime = stanCfg.ime;
		this.vlasnik = stanCfg.vlasnik;
		this.zgrada = stanCfg.zgrada;

	}
}

interface StanInterface {
	id?: number;
	adresa : string;
	brStanovnika: string,
	ime: string;
	vlasnik: Korisnik;
	zgrada: Zgrada;
}