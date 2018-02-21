export class Korisnik implements KorisnikInterface{
	public id: number;
	public ime: string;
	public korisIme: string;
    public lozinka: string;
    public uloga: string
    
		
	constructor(korisnikCfg:KorisnikInterface)
	{	
		this.id = korisnikCfg.id;
		this.ime = korisnikCfg.ime;
        this.korisIme = korisnikCfg.korisIme;
        this.lozinka = korisnikCfg.lozinka;
		this.uloga = korisnikCfg.uloga;		
	}
}

interface KorisnikInterface{
	id?: number;
	ime: string;
    korisIme: string;	
    lozinka: string;
	uloga: string;
}