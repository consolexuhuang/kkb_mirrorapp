import { Component, OnInit,ChangeDetectorRef,NgZone } from '@angular/core';
import { NavController} from '@ionic/angular'; 
import { nativeService } from '../../providers/nativeService';


import { utils } from '../../providers/utils';
import {bluebooth} from '../../providers/bulebooth'
import { ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import {CommonService} from '../../services/common.service';  //注意两个点


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
  videoConfig:any = {
    '燃脂': [{id:'1',coursename:'BODYATTACK有氧挑战',time:'14分41秒',coach:'Laura',cal:'150',videoUrl:'hhhh', backgroudImg:'gggg'},
                   {id:'2',coursename:'Yoga Flow流瑜伽-Vol.1',time:'12分42秒',coach:'乐仔',cal:'60',videoUrl:'fg', backgroudImg:''},
                   {id:'3',coursename:'BODYCOMBAT燃脂搏击',time:'13分28秒',coach:'Lisa',cal:'120',videoUrl:'hhhh', backgroudImg:'gggg'},
                   {id:'4',coursename:'Zumba尊巴-Vol.1',time:'4分23秒',coach:'Lisa',cal:'40',videoUrl:'fg', backgroudImg:''}],
   
    '塑形': [{id:'5',coursename:'Yoga Flow流瑜伽-Vol.2',time:'12分42秒',coach:'乐仔',cal:'60',videoUrl:'fg', backgroudImg:''},
            {id:'6',coursename:'Zumba尊巴-Vol.2',time:'4分23秒',coach:'Lisa',cal:'40',videoUrl:'fg', backgroudImg:''}],
    '舞蹈': [{id:'7',coursename:'Zumba尊巴-Vol.3',time:'4分23秒',coach:'Lisa',cal:'40',videoUrl:'fg', backgroudImg:''}],
    '舞蹈直播课': [{id:'8',coursename:'ffff',time:'',coach:'ffgfg',cal:'4545',videoUrl:'gggg', backgroudImg:'ggggg'}]
  }
  videoListTab:any = []
  videoList:any = [
    // {name:'BODYCOMBEAT燃脂搏击',coach:'乐仔'},
  ]
  createdCode: any = ''
  mirrorLinkState:boolean = false
  currentTabState:any = '燃脂'
  constructor(
    public nativeService: nativeService,
    public nav: NavController,
    private blue : bluebooth,
    private file : File,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    public httpService:CommonService,
  ){}
  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.currentTabState = ev.detail.value
  }
  // 异步更新试图
  updataSyncFun(){
    this.ref.markForCheck();
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
    // this.ref.detectChanges();
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter-index------')
    this.StartCommandListener()
    this.blue.getBandsInfo() //获取手环信息
    if(this.route.snapshot.queryParams.id == 'list'){ //监听返回页面的参数
      this.mirrorLinkState = true

      this.videoConfig = utils.localStorageGetItem('videoConfig')
      this.videoListTab = Object.keys(this.videoConfig)
      this.videoList = this.videoConfig[this.videoListTab[0]]
      this.updataSyncFun()
    }
  }
  ngOnInit() {
    // var url='';
    // this.httpService.ajaxGet(url).then((Response)=>{
    // })
    console.log('index-init',this.file)
    this.showMirrorCode()
    
  }
  //开始接收
  StartCommandListener() {
    let that = this
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","registerListener",['index']);
    function callSuccess(message:any) {
      if(message.type == 'action'){
        console.log("receive command-index:  ", message)
        // console.log("receive command-index:  ", message)
         //监听列表回调(镜子连接成功，显示列表)
         if(message.action == 20){
            that.mirrorLinkState = true
            that.videoConfig = message.data[0]
            that.videoListTab = Object.keys(that.videoConfig)
            that.videoList = that.videoConfig[that.videoListTab[0]]
            that.updataSyncFun()
            utils.localStorageSetItem('videoConfig',message.data[0]) //本地先存列表
         }
         //监听播放准备回调
         if(message.action == 6){ //播放准备命令
            // that.blue.unRegisterListener('index')
            that.ngZone.run(() => {
              that.nav.navigateForward('/readyvideo')
            })
         }
         //切换tab
         if(message.action == 30){
            that.currentTabState = '燃脂'
            that.videoList = that.videoConfig[that.currentTabState]
            that.updataSyncFun()
         }
         if(message.action == 31){
           that.currentTabState = '塑形'
           that.videoList = that.videoConfig[that.currentTabState]
           that.updataSyncFun()
         }
         if(message.action == 32){
           that.currentTabState = '舞蹈'
           that.videoList = that.videoConfig[that.currentTabState]
           that.updataSyncFun()
         }
         if(message.action == 33){
           that.currentTabState = '舞蹈直播课'
           that.videoList = that.videoConfig[that.currentTabState]
           that.updataSyncFun()
         }
       }

       if(message.type == 'stateChange'){
        //  监听镜子连接状态回调
         if(message.status !== 2){ //镜子断开连接
            that.nativeService.showToast('镜子未连接','danger')
            utils.localStorageRemoveItem('videoConfig')
            that.showMirrorCode()  //重新展示二维码
            that.mirrorLinkState = false
            that.updataSyncFun()
         }
       }

       if(message.type == 'status'){
         //  监听手环连接回调
         if(message.data.status == 1) {
           that.blue.Start(false)  //手环数据监听回调 true不接受三轴 false接受
           that.nativeService.showToast('手环连接成功','dark')
         }
         if(message.data.status == 3 || message.data.status == 4){
           that.nativeService.showToast('手环连接失败','danger')
         }
       }
    }
    //失败后回调
    function callFail(message:any) {
        that.nativeService.showToast(message,'medium')
        // alert("startCommandListener fail:  " + message);
    }
  }
  // 显示镜子二维码
  showMirrorCode(){
    let that = this
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","getMirrorName",null);
    function callSuccess(message:any) {
      console.log('getMirrorName成功',message)
      that.createdCode = message
      that.updataSyncFun()
    }
    //失败后回调
    function callFail(message:any) {
      that.nativeService.showToast('镜子获取失败','danger')
    }
  }
}
