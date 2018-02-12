export class Firma implements FirmaInterface{
    public id: number;
    public ime: string;
    
    constructor(firmaCfg: FirmaInterface)
	{	
		this.id = firmaCfg.id;
		this.ime = firmaCfg.ime;
	}
}

interface FirmaInterface {
	id?: number;
	ime: string;
}