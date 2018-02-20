export class Zgrada implements ZgradaInterface{
	public id: number;
	public ime: string;
	public adresa: string;
	public vlasnik: string;
		
	constructor(zgradaCfg: ZgradaInterface)
	{	
		this.id = zgradaCfg.id;
		this.ime = zgradaCfg.ime;
		this.adresa = zgradaCfg.adresa;
		this.vlasnik = zgradaCfg.vlasnik;
	}
}

interface ZgradaInterface {
	id?: number;
	ime: string;
	adresa: string;
	vlasnik: string;
}