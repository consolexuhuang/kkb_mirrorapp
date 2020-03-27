import { Component, OnInit, ChangeDetectorRef,ViewChild, NgZone} from '@angular/core';
import { NavController} from '@ionic/angular'; //弹框


import {bluebooth} from '../../providers/bulebooth'
import VConsole from 'vconsole';
import { utils } from '../../providers/utils';
var vConsole = new VConsole();
declare var cordova:any
@Component({
  selector: 'app-readyvideo',
  templateUrl: './readyvideo.page.html',
  styleUrls: ['./readyvideo.page.scss'],
})
export class ReadyvideoPage implements OnInit {

  constructor(
    public nav: NavController,
    private blue : bluebooth,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
  ) { }
  
  ionViewWillEnter(){
    console.log('ionViewWillEnter-readyvideo------')
    this.StartCommandListener()
    this.blue.Start(false)  //手环数据监听回调 true不接受三轴 false接受
  }
  ngOnInit() {
    console.log('mirrorVideoState--init')
  }
  //开始接收
  StartCommandListener() {
    let that = this
    let collectArr:any = []
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","registerListener",['mirrorVideoState']);
    function callSuccess(message:any) {
      console.log("receive command-readyvideo:  ", message)
      if(message.type == 'action'){
        if(message.action == 21){ //播放
          that.blue.unRegisterListener('mirrorVideoState')
          that.ngZone.run(() => {
            that.nav.navigateForward('/training')
          })
        }
        if(message.action == 20){ //显示视频列表
          // that.blue.Stop()
          that.ngZone.run(() => {
            that.nav.navigateForward(['/index'],{ queryParams:{ id:'list'} })
          })
          that.blue.unRegisterListener('mirrorVideoState')
        }
       }
       if(message.type == 'data'){ 
          // 监听收集心率, cal, xyz, a 1:bpm  3:three
          if(message.datatype == 3){
              that.blue.sendMessage(5) //第一次接受心率成功
          }
       }
       if(message.type == 'stateChange'){
        //监听镜子断开连接
        if(message.status !== 2){ 
           utils.localStorageRemoveItem('videoList')
           alert('连接已断开')
        }
      }
      //  alert("receive command:  " + JSON.stringify(message));

    }
    //失败后回调
    function callFail(message:any) {
        alert("startCommandListener fail:  " + message);
    }
  }

}
