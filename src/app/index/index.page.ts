import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NavController} from '@ionic/angular'; 
import { nativeService } from '../../providers/nativeService';

import { utils } from '../../providers/utils';
import {bluebooth} from '../../providers/bulebooth'
import { ActivatedRoute } from '@angular/router';

import VConsole from 'vconsole';

var vConsole = new VConsole();
declare var cordova:any

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  headerImg:string = 'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png'
  srcImg:any = utils.androidBackground
  videoList:any = [
    // {name:'BODYCOMBEAT燃脂搏击',coach:'乐仔'},
  ]
  createdCode: any = ''
  mirrorLinkState:boolean = false
  constructor(
    public nativeService: nativeService,
    public nav: NavController,
    private blue : bluebooth,
    // private utils: utils,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ){}
  // 异步更新试图
  updataSyncFun(){
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  ngOnInit() {
    console.log('index init------')
    this.StartCommandListener()
    this.showMirrorCode()
    this.blue.getBandsInfo() //获取手环信息
    if(this.route.snapshot.queryParams.id == 'list'){ //监听返回页面的参数
      this.mirrorLinkState = true
      this.videoList = utils.localStorageGetItem('videoList')
      this.updataSyncFun()
    }
  }
  //开始接收
  StartCommandListener() {
    let that = this
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","registerListener",['index']);
    function callSuccess(message:any) {
       console.log("receive command-index:  ", message)

       if(message.type == 'action'){
         //监听列表回调(镜子连接成功，显示列表)
         if(message.action == 20){
            that.mirrorLinkState = true
            that.videoList = message.data
            that.updataSyncFun()
            utils.localStorageSetItem('videoList',message.data) //本地先存列表
         }
         //监听播放回调
         if(message.action == 21){ //播放
            // that.blue.unRegisterListener('index')
            that.nav.navigateForward('/training')
         }
       }

       if(message.type == 'stateChange'){
        //  监听镜子连接状态回调
         if(message.status !== 2){ //镜子断开连接
            utils.localStorageRemoveItem('videoList')
            alert('连接已断开')
            that.showMirrorCode()  //重新展示二维码
            that.mirrorLinkState = false
            that.updataSyncFun()
         }
       }

       if(message.type == 'status'){
        //  监听手环连接回调
         if(message.data.status == 1) {
           alert('手环连接成功！')
         }
       }
    }
    //失败后回调
    function callFail(message:any) {
        alert("startCommandListener fail:  " + message);
    }
  }
  // 镜子二维码
  showMirrorCode(){
    let that = this
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","getMirrorName",null);
    function callSuccess(message:any) {
      console.log('getMirrorName成功',message)
      that.createdCode = message
      that.updataSyncFun()
      //  alert("getMirrorName success:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
        alert("镜子获取失败- " + message);
    }
  }
}
