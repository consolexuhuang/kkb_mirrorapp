import { Component } from '@angular/core';

import { Platform ,ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
declare const window:any

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
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }
  backButtonPressent:boolean

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('statusBar-----',this.statusBar.hide())
      this.statusBar.hide()
      this.splashScreen.hide();
      
      document.addEventListener('backbutton', e => {
        console.log('监听成功----------',window.location.href)
        const url = window.location.href;
        const exitIndexs = ['/index', 'index']
        if(~exitIndexs.findIndex(index => url.indexOf(index) >= 0)){
          this.showExit();
        } else {
          e.preventDefault()
        }
      }, true)

    });
  }
    
  showExit() {
    if(!this.backButtonPressent){
      this.toastCtrl.create({
        message:'再按一下退出',
        duration:2000,
        position:'middle'
      }).then(t => t.present())
      this.backButtonPressent = true;
      setTimeout(() => this.backButtonPressent = false, 2000)
    } else {
      navigator['app'].exitApp(); //退出APP
    }
  }
}
