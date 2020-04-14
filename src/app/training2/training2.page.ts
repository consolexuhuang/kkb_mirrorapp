import { Component, OnInit } from '@angular/core';
import { Downloader,DownloadRequest } from '@ionic-native/downloader/ngx';
import { Platform ,ModalController, NavController} from '@ionic/angular';

import VConsole from 'vconsole';
var vConsole = new VConsole();
@Component({
  selector: 'app-training2',
  templateUrl: './training2.page.html',
  styleUrls: ['./training2.page.scss'],
})
export class Training2Page implements OnInit {

  constructor(
    private platform: Platform,
    private Modnav: ModalController,
    private downloader: Downloader,
    private nav: NavController
  ) { 
    // this.platform.ready().then(() => {
    //   var request: DownloadRequest = {
    //     uri: 'https://img.cdn.powerpower.net/vid.mp4',
    //     title: 'MyDownload',
    //     description: '',
    //     mimeType: '',
    //     visibleInDownloadsUi: true,
    //     notificationVisibility: 0,
    //     destinationInExternalFilesDir: {
    //         dirType: 'Downloads',
    //         subPath: 'vid.mp4'
    //     }
    // };
  
  
    //    this.downloader.download(request)
    //         .then((location: string) => console.log('File downloaded at:'+location))
    //         .catch((error: any) => console.error(error));
    // })
  }
  videoSrc: string = 'file:///sdcard/yoga.mp4'
  // videoSrc2: string = 'http://img.cdn.powerpower.net/vid2.mp4'

  ngOnInit() {
    // window.location.href ='ionic://www.abc.com'
    // window.location.href ='file:///android_asset/index.html'
    // cordova.exec(function(succ){

    // }, function(err){

    // },'111','11')
  }
  onClick(){
//  this.nav.back()
  //  this.nav.navigateForward('file:///android_asset/index.html')
  //  this.Modnav.dismiss()
  //   var request: DownloadRequest = {
  //     uri: 'https://img.cdn.powerpower.net/vid.mp4',
  //     title: 'MyDownload',
  //     description: '',
  //     mimeType: '',
  //     visibleInDownloadsUi: true,
  //     notificationVisibility: 0,
  //     destinationInExternalFilesDir: {
  //         dirType: 'Downloads',
  //         subPath: 'vid.mp4'
  //     }
  // };


  //    this.downloader.download(request)
  //         .then((location: string) => console.log('File downloaded at:'+location))
  //         .catch((error: any) => console.error(error));
  }
}
