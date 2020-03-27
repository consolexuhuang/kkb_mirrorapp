import { Component } from '@angular/core';

import { Platform ,AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
 
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.backButtonEvent()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
 
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
 
      if (this.router.url == 'index') {
 
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
 
          navigator['app'].exitApp(); //退出APP
 
        } else {
 
          this.presentAlertConfirm();
          this.lastTimeBackPress = new Date().getTime();//再按
 
        }
 
        // navigator['app'].exitApp(); //ionic4 退出APP的方法
      }
 
    })
  }
 
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: '您要退出APP吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
 
        }, {
          text: '退出',
          handler: () => {
            navigator['app'].exitApp();
          }
 
        }
      ]
 
    });
 
    await alert.present();
  }
 
}
