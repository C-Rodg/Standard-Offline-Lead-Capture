import {App} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {StorageService} from './providers/storage-service/storage-service';
import {UploadService} from './providers/upload-service/upload-service';
import {ConfigService} from './providers/configuration-service/configuration-service';
import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
import {TabsPage} from './pages/tabs/tabs';
//Enable productions mode
import {enableProdMode} from 'angular2/core';
enableProdMode();

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [JSONP_PROVIDERS, StorageService, UploadService, ConfigService],
  config: {
    mode: 'md'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = TabsPage;
  
  overwrite : boolean = false;

  constructor(public storageService : StorageService, public uploadService : UploadService) {    

    // Begin pushing data
    this.initializeApp();  
  }
  
  private initializeApp() {
    let that = this;
    that.storageService.getLocalOverwrite().then((data) => {
      that.overwrite = data;      
      setInterval(function(){that.startPendingUploads(that)}, 420000); //Every 7 minutes = 420000
    });
  }
  
  private startPendingUploads(that) {
    if(navigator.onLine) {
      that.storageService.getPendingRecords().then((data) => {
        if(data.res.rows.length > 0){
          that.uploadService.buildUploadURLs(data.res.rows, that.overwrite);
        }
      });
    }
  }
}
