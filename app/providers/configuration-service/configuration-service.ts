import {Injectable} from 'angular2/core';

@Injectable()
export class ConfigService {    
    organizationGuid : string = '';
    leadsourceGuid : string = '';

    constructor() {             
    }           

    setOrgGuid(newGuid) {    	
    	this.organizationGuid = newGuid;
    }

    setLeadGuid(newGuid) {
    	this.leadsourceGuid = newGuid;
    }

    getOrgGuid() {
    	return this.organizationGuid;
    }

    getLeadGuid() {
    	return this.leadsourceGuid;
    }
}