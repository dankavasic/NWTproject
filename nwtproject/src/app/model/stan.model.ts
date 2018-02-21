export class Stan implements StanInterface{
    public id: number;
	public ime: string;
	public adresa : string;
	public zgrada : string;
    
    constructor(stanCfg: StanInterface)
	{	
		this.id = stanCfg.id;
		this.ime = stanCfg.ime;
		this.adresa = stanCfg.adresa;
		this.zgrada = stanCfg.zgrada;

	}
}

interface StanInterface {
	id?: number;
	ime: string;
	adresa : string;
	zgrada: string;
}