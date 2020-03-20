import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { nativeService } from '../providers/nativeService';
import { Toast } from '@ionic-native/toast/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { utils } from '../providers/utils';
import {bluebooth} from '../providers/bulebooth'

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,   
    NgxQRCodeModule 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    nativeService,
    Toast,
    File,
    ImagePicker,
    Camera,
    WebView,
    utils,
    bluebooth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
