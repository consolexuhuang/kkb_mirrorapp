import { Component, OnInit, ChangeDetectorRef,ViewChild, NgZone} from '@angular/core';
import {Platform, NavController} from '@ionic/angular'; //弹框
import { ActivatedRoute } from '@angular/router';

import { nativeService } from '../../providers/nativeService';

import {VgAPI} from 'videogular2/compiled/core'
import {bluebooth} from '../../providers/bulebooth'
import { utils } from '../../providers/utils';
import { File } from '@ionic-native/file/ngx';
import { from } from 'rxjs';

import VConsole from 'vconsole';
var vConsole = new VConsole();
declare var cordova:any
// (window as any).requestFileSystem

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  // videoSrc: string = 'file:///sdcard/yoga.mp4'
  // videoSrc: string = 'http://img.cdn.powerpower.net/vid.mp4'

  videoId:any
  videoList:any = [
    {id:50,openid:60, url:'http://localhost:5000/BA_Laura_v2.mp4', cal:150000},
    {id:51,openid:61, url:'http://localhost:5000/BC_Lisa_v2.mp4',cal:60000},
    {id:52, openid:62,url:'http://localhost:5000/Test_Manman_203.mp4',cal:120000},
    {id:53,openid:63, url:'http://localhost:5000/Yoga_Lezai_v2.mp4',cal:40000}
  ]
  videoUrl:string = ''
  preload:string = 'auto';
  api:VgAPI;
  userList:Array<Object> = [
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'Adsend'},
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'Efljy'},
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'dddff'},
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'Adstndds'},
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'fgllhh'},
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'sfyds'},
    {img:'https://img.cdn.powerpower.net/5e202c1ae4b0e8c8916c0773.png',name:'dfhghgh'},
  ];
  changeFontSize:any = this.rem(46)
  timeDown:number = 5 //视频倒计时
   
  //bpm最大值
  BPMRange:number = 200; //BPM最大值

  // BPMWidth:number = this.platform.width()/1.585 // px
  //bpm宽度
  BPMWidth:number = 473/7.5 // vw

  // 指示点宽度
  pointWidth:number = 30/7.5 //px
  //当前bpm值
  currentBPM: Number = 0  //当前BPM
  // 总卡路里值
  totalCal:number = 0
  targetCal:any
  trainTime:any
  //收集bpm序列
  allBpmCollect:any = []

  //BPM目标段区间配置值
  BPMdurTarget:Array<any> = [
    [10,40],
    [30,80],
    [50,90],
    [20,80],
    [40,90],
    [50,100],
    [50,90],
    [20,80],
    [40,90],
    [40,90],
    [50,100],
    [50,90],
    [20,80],
    [40,90],
  ]

  progressReptObj: Object = {
    "left":0,
    "width":0
  }
  currentReptObj: Object = {
    "left": - this.rem(15),
  }
  collectArr: any 
  volumeState:boolean = false
  timerObj:any

  @ViewChild("myProgress", {static:true}) myprogress: any;
  constructor(
    public nativeService: nativeService,
    private ref:ChangeDetectorRef,
    public nav: NavController,
    private blue : bluebooth,
    private file : File,
    private ngZone: NgZone,
    private platform: Platform,
    private route : ActivatedRoute
  ) { }

  rem($px){
    return $px/7.5 + 'vw'
  }
  // 异步更新视图
  updataSyncFun(){
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  timeDownMethod(){
    let timerObj = setInterval(()=>{
      if(this.timeDown == 0){
        clearTimeout(timerObj)
        this.startVideo()
      } else {
        this.timeDown = this.timeDown-1
      }
    },1000)
  }
  //开始视频
  startVideo(){
    // console.log(this.api)
    this.api.play()
    this.computeBPMdur()
    this.computeCal()
  }
  onPlayerReady(api:VgAPI) {
    this.api = api;
    
    // 监听监听播放结束
    console.log(this.api)
    // setInterval(()=>{
    //   console.log('canPlayThrough--',this.api.canPlayThrough)
    // },1000)
    // 视频play
    this.api.getDefaultMedia().subscriptions.play.subscribe(
      () => {
        console.log('play--视频开始播放')
      }
    );
    this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(
      (a)=>{
        console.log('canPlayThrough--视频缓冲完成')
        this.timeDownMethod()
        // this.api.play()
      }
    )
    //视频over
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          console.log('video-over')
          utils.sessionStorageSetItem('allCollectBpm',this.allBpmCollect)
          utils.sessionStorageSetItem('allCal',this.totalCal)
          utils.sessionStorageSetItem('trainTime',this.trainTime)
          this.blue.completeTraining() //回调完成
          this.blue.Stop()  //暂停监听
          this.api.getDefaultMedia().currentTime = 0 //视频重启
          this.blue.unRegisterListener('training')
          this.nav.navigateForward('/traincomplete')
      }
    );
  }
  ngAfterContentInit(){
    // console.log('width',this.platform.width()/1.585)
    // this.onPlayerReady()
  }

  progressRept(leftData:number, widthData:number = null, prosressWidth:number, progressRange:number,){
    let companyBpm = progressRange/prosressWidth
    // console.log(companyBpm)
    // if(widthData) {
    //   return {
    //     "left":this.rem(leftData/companyBpm),
    //     "width": this.rem(widthData/companyBpm)
    //   }
    // } else {
    //   return {
    //     "left":this.rem(leftData/companyBpm - this.pointWidth),
    //   }
    // }
    if(widthData) {
      return {
        "left":this.rem(leftData*companyBpm),
        "width": this.rem(widthData*companyBpm)
      }
    } else {
      return {
        "left":this.rem(leftData*companyBpm - this.pointWidth),
      }
    }
  }
  // 计算区间BPM
  computeBPMdur(){
    let timerBPMdur : any
    this.progressReptObj = this.progressRept(this.BPMdurTarget[0][0], 
                                             this.BPMdurTarget[0][1] - this.BPMdurTarget[0][0],
                                             this.BPMWidth, 
                                             this.BPMRange,)
    let i = 1
    timerBPMdur = setInterval(()=>{
      if(i < this.BPMdurTarget.length){
        this.progressReptObj = this.progressRept(this.BPMdurTarget[i][0],
                                                 this.BPMdurTarget[i][1] - this.BPMdurTarget[i][0],
                                                 this.BPMWidth, 
                                                 this.BPMRange)
        // console.log(this.progressReptObj)
        i++
      } else {
        clearInterval(timerBPMdur)
      }
    },10000)
  }
  // 计算当前BPM
  copmuteCurrBPM(currentBarndsBPM:any){
    this.allBpmCollect.push(currentBarndsBPM)
    this.currentBPM = currentBarndsBPM
    this.currentReptObj =  this.progressRept(currentBarndsBPM, 
                                              null, 
                                              this.BPMWidth,  
                                              this.BPMRange,)
                                              this.updataSyncFun()
  }
  // 计算kal
  computeCal(){
    // this.targetCal = 15000
    console.log('computeCal',this.api, this.api.duration)
    this.totalCal = 0
    let timeItemCal = parseInt((this.targetCal / this.api.duration).toFixed(0))
    let a = (this.api.duration/60).toFixed(2)
    this.trainTime = a.replace(a[a.indexOf('.')],':')

    let timer = setInterval(()=>{
      if(this.totalCal > this.targetCal){
        clearInterval(timer)
      } else {
        this.totalCal += timeItemCal
        if(this.totalCal > 1000){
          this.changeFontSize = this.rem(38)
       } else {
         this.changeFontSize = this.rem(46)
       }
       this.updataSyncFun()
      }
    },1000)
  }
  // 音量增
  volumeAdd(){
    let turnOff:any = true
    clearTimeout(this.timerObj)
    this.volumeState = true
    if(this.api.volume >= 1){
      this.api.volume += 0
    } else {
      this.api.volume += 0.1
    }

    this.timerObj = setTimeout(()=>{
      turnOff == false
      this.volumeState = false
    },2000)
  }
  // 音量-
  volumeReduce(){
    let turnOff:any = true
    clearTimeout(this.timerObj)
    this.volumeState = true
    if(this.api.volume <= 0){
      this.api.volume -= 0
    } else {
      this.api.volume -= 0.1
    }

    this.timerObj = setTimeout(()=>{
      turnOff == false
      this.volumeState = false
    },2000)
  }
  ngOnInit() {
    console.log('videoId',this.route.snapshot.queryParams,this.videoList)
    this.videoId = this.route.snapshot.queryParams.id
    for(let i = 0; i< this.videoList.length; i++){
      if(this.videoList[i].openid == this.route.snapshot.queryParams.id) {
        this.videoUrl = this.videoList[i].url
        this.targetCal = this.videoList[i].cal
        console.log('videoUrl',this.videoUrl,this.targetCal)
      }
    }
    this.StartCommandListener()  //监听回调
    
  };
  ngAfterViewInit(){
    this.myprogress.nativeElement.style.width = this.BPMWidth + 'vw'
  }
  // ionViewWillEnter(){
  //   this.blue.unRegisterListener('mirrorVideoState')
  // }
  //开始接收
  StartCommandListener() {
    let that = this
    // let collectArr:any = {
    //   three:[],
    //   heart:[]
    // }
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","registerListener",['training']);
    function callSuccess(message:any) {
      console.log("receive command-training:  ", message)
      if(message.type == 'action'){
         //  监听暂停
         if(message.action == 22){ //暂停
           that.api.pause()
          //  console.log('暂停：',collectArr)
          //  that.createAndwriteFile(JSON.stringify(collectArr))
         }
         //  监听继续
         if(message.action == 23){ //继续
           that.api.play()
         }
         //音量+
         if(message.action == 40){ 
           that.volumeAdd()
         }
         //音量-
         if(message.action == 41){ 
           that.volumeReduce()
         }
         //  监听返回
         if(message.action == 20){ //显示视频列表
            that.api.getDefaultMedia().currentTime = 0 //视频重启
            that.ngZone.run(() => {
              that.nav.navigateForward(['/index'],{ queryParams:{ id:'list'} })
            })
            // that.blue.unRegisterListener('training')
         }
       }
       if(message.type == 'data'){ 
        //  console.log('training:heart-',message)
          // 监听收集心率, cal, xyz, a
          if(message.datatype == 1) {
            that.copmuteCurrBPM(message.heart)
            // that.computeCal(message.cal)
            // let objItem2 = {}
            // objItem2['time'] = that.api.currentTime.toFixed(2)
            // objItem2['bpm'] = message.heart || 0
            // collectArr.heart.push(objItem2)
          }
          // if(message.datatype == 3 && that.api.currentTime>0){
          //   let objItem = {}
          //   objItem['time'] = that.api.currentTime.toFixed(2)
          //   // objItem['bpm'] = message.heart || '0'
          //   objItem['x'] = message.x || 0
          //   objItem['y'] = message.y || 0
          //   objItem['z'] = message.z || 0
          //   collectArr.three.push(objItem)
          // }
       }
       if(message.type == 'stateChange'){
        //监听镜子断开连接
        if(message.status !== 2){ 
           utils.localStorageRemoveItem('videoList')
           that.nativeService.showToast('连接已断开！','danger')
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

  //创建并写入文件
  createAndwriteFile(text:any){
    this.file.checkFile('file:///storage/emulated/0/', 'collect.txt').then(()=>{
      this.file.writeFile('file:///storage/emulated/0/', 'collect.txt', text, { append: false, replace: true })
    }).catch(() => {
      this.file.createFile('file:///storage/emulated/0/', 'collect.txt', true)
      this.file.writeFile('file:///storage/emulated/0/', 'collect.txt', text, { append: false, replace: true })
    })
  }
}
