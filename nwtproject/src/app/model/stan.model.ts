export class Stan implements StanInterface{
    public id: number;
    public ime: string;
    
    constructor(stanCfg: StanInterface)
	{	
		this.id = stanCfg.id;
		this.ime = stanCfg.ime;
	}
}

interface StanInterface {
	id?: number;
	ime: string;
}