export class Firma implements FirmaInterface{
    public id: number;
	public ime: string;
	public adresa: string;
	public telefon: number;
	public webSite: string;
	public email: string;
    
    constructor(firmaCfg: FirmaInterface)
	{	
		this.id = firmaCfg.id;
		this.ime = firmaCfg.ime;
		this.adresa = firmaCfg.adresa;
		this.telefon = firmaCfg.telefon;
		this.webSite = firmaCfg.webSite;
		this.email = firmaCfg.email;
	}
}

interface FirmaInterface {
	id?: number;
	ime: string;
	adresa: string;
	telefon: number;
	webSite: string;
	email: string;
}