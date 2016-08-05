import {Page, NavController, Alert} from 'ionic-angular';
import {ConfigService} from '../../providers/configuration-service/configuration-service';
import {PageCapture} from '../page-capture/page-capture';
import {PageLeads} from '../page-leads/page-leads';
import {PageSettings} from '../page-settings/page-settings';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor(private nav : NavController, private configService : ConfigService) {  	  	
  }

  ngOnInit() {
  	let configArr = window.location.search.slice(1).split("&");
  	let configObj = {};
  		for(let x = 0; x < configArr.length; x++) {
	  		let split = configArr[x].split("=");
	  		let configKey = split[0];
	  		let configVal = split[1];
	  		configObj[configKey] = configVal;
	  	}
	  	if(configObj['lsg'] && configObj['org']){
	  		this.configService.setLeadGuid(configObj['lsg']);
        this.configService.setOrgGuid(configObj['org']);
	  	} else {
        //window.Rollbar.error("Incorrect Lead Source Guid or Org Guid");
        let incorrectConfiguration = Alert.create({
          title: 'Insufficient Credentials',
          subTitle: 'Your Lead Source or Organizational GUID are missing.  Please check the URL and try again.',
          buttons: ['Dismiss']
        });
        this.nav.present(incorrectConfiguration);        
      }	  
  }
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = PageCapture;
  tab2Root: any = PageLeads;
  tab3Root: any = PageSettings;
}
