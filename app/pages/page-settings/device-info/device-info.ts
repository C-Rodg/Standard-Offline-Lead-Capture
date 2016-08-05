import {Page, ViewController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/page-settings/device-info/device-info.html'
})
export class DeviceInfo {
	leadGuid : string = '';
	deviceId : string = '';
	orgGuid : string = '';

	constructor(private viewCtrl : ViewController, private params : NavParams) {
		this.leadGuid = params.get("LSG");
		this.deviceId = params.get("DID");
		this.orgGuid = params.get("OG");
	}	

	closeSettings(){
		this.viewCtrl.dismiss();
	}
}