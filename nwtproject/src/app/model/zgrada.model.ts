export class Zgrada implements ZgradaInterface{
	public id: number;
	public ime: string;
		
	constructor(zgradaCfg: ZgradaInterface)
	{	
		this.id = zgradaCfg.id;
		this.ime = zgradaCfg.ime;
	}
}

interface ZgradaInterface {
	id?: number;
	ime: string;
}