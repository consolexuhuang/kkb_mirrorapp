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
  srcImg:any = utils.androidBackground

  ionViewWillEnter(){
    console.log('ionViewWillEnter-readyvideo------')
    this.StartCommandListener()
    this.blue.sendMessage(5)
    // this.blue.Start(false)  //手环数据监听回调 true不接受三轴 false接受
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
      if(message.type == 'action'){
        console.log("receive command-readyvideo:  ", message)
        if(message.action == 50 || message.action == 51 || message.action == 52 || message.action == 53){ //播放
          // that.blue.unRegisterListener('mirrorVideoState')
          that.ngZone.run(() => {
            that.nav.navigateForward('/training')
          })
        }
        if(message.action == 20){ //显示视频列表
          // that.blue.Stop()
          that.ngZone.run(() => {
            that.nav.navigateForward(['/index'],{ queryParams:{ id:'list'} })
          })
          // that.blue.unRegisterListener('mirrorVideoState') //如果频繁的操作注册监听和，关闭监听，会出现发送发送命令失败的情况
        }
       }
       if(message.type == 'data'){ 
          // 监听收集心率, cal, xyz, a 1:bpm  3:three
          if(message.datatype == 1){
              console.log('心率收集成功！')
              // that.blue.sendMessage(5) //第一次接受心率成功
          }
       }
       if(message.type == 'stateChange'){
        //监听镜子断开连接
        if(message.status !== 2){ 
           utils.localStorageRemoveItem('videoConfig')
          //  alert('连接已断开')
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
