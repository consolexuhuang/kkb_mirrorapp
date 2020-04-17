import { Component, OnInit, ChangeDetectorRef,ViewChild, NgZone} from '@angular/core';
import {Platform, NavController} from '@ionic/angular'; //弹框
import { ActivatedRoute } from '@angular/router';

import { nativeService } from '../../providers/nativeService';

import {VgAPI} from 'videogular2/compiled/core'
import {bluebooth} from '../../providers/bulebooth'
import { utils } from '../../providers/utils';
import { File } from '@ionic-native/file/ngx';
import { from } from 'rxjs';

// import VConsole from 'vconsole';
// var vConsole = new VConsole();
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
    {id:50,openid:60, url:'http://localhost:5000/BA_Laura_v2.mp4', cal:150},
    {id:51,openid:61, url:'http://localhost:5000/BC_Lisa_v2.mp4',cal:60},
    {id:52, openid:62,url:'http://localhost:5000/Yoga_Lezai_v2.mp4',cal:120},
    {id:53,openid:63, url:'http://localhost:5000/Zumba_Lisa_v2.mp4',cal:40}
  ]
  videoUrl:string = ''
  preload:string = 'auto';
  api:VgAPI;
  userList:Array<Object> = [
    {img:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCiaBWEhhsicQZnUIBXYqDGsntaLVRsgCfIKqIm2CO17601mcrVzOxME7HsV84Ie7ku1Io54n1EcGw/132',name:'仙儿'},
    {img:'https://wx.qlogo.cn/mmhead/ibdowAJc1Mp3IRPxhO4ywC1hXAq2gSqYexoQeuTNjocA/132',name:'yell键'},
    {img:'https://thirdwx.qlogo.cn/mmopen/icMcvFxAcaBAjgaJxJRgibWWiapG9EaySqF26D8uQRlfxokm7skSbzgViaUQoRA2ET7urS8fWPEXcmNicoYUibpiakhnltqW29L2JZ2/132',name:'Swikinini'},
    {img:'https://wx.qlogo.cn/mmopen/vi_32/xCuSHusxZP9DmEYmvcHTJ6n8sjeOUAnRrrFhP7XUCwZmtjZh6Hn26SKXjgzibNEwypw1MLjic1j6m1br2jGFCfPg/132',name:'console.log'},
    {img:'https://wx.qlogo.cn/mmhead/gGOplQlWUI7Zic3licKvzpoia2GYc5Sq77hxZZwxpkYHhg/132',name:'林木康'},
    {img:'https://wx.qlogo.cn/mmhead/nF9pJiaFKZibboAyNghy3Rh9WianN6fhdQJd2Q38M7K0Ic/132',name:'li惠茹'},
    {img:'https://wx.qlogo.cn/mmopen/vi_32/tWs2GslLYqe1s3Ryh6914uYGlauTdF0t9aW1glqElru0sMTyrIs5biaOFK6XBIjfzicyWpZNVsROfwhBqx9ZVn4w/132',name:'Ellasa'},
    {img:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKoOmEwlmMScWfnDDj13EXWfwU8ZkUNBsmibRoGvzMhUyZDTcSIZIS3xYAdJBkAa2ia7E6tjloOEHicg/132',name:'萌子'},
    {img:'https://thirdwx.qlogo.cn/mmopen/icMcvFxAcaBAjgaJxJRgibWQ3eBvF5JAakzmGe15Dn8rzh7zopsOhOzRdRKxnIYzwdoeIkrt9WG2S8VJ3VJLGofjXcsea7tTgK/132',name:'沉默de岁月'},

    {img:'https://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLAc0V7jK0k5AHgN5thOZdy6FbfuIv7YQI4cFzpniaIicialym1Mia2lPy9xgAq8lRiaIplwO4N5CT9fdRoPtYRYvIMEE0wLKKo4ic9Ro/132',name:'国盼'},
  ];
  roundUseList:any = [
    {img:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCiaBWEhhsicQZnUIBXYqDGsntaLVRsgCfIKqIm2CO17601mcrVzOxME7HsV84Ie7ku1Io54n1EcGw/132',name:'仙儿'},
    {img:'https://wx.qlogo.cn/mmhead/ibdowAJc1Mp3IRPxhO4ywC1hXAq2gSqYexoQeuTNjocA/132',name:'yell键'},
    {img:'https://thirdwx.qlogo.cn/mmopen/icMcvFxAcaBAjgaJxJRgibWWiapG9EaySqF26D8uQRlfxokm7skSbzgViaUQoRA2ET7urS8fWPEXcmNicoYUibpiakhnltqW29L2JZ2/132',name:'Swiki'},
    {img:'https://wx.qlogo.cn/mmopen/vi_32/xCuSHusxZP9DmEYmvcHTJ6n8sjeOUAnRrrFhP7XUCwZmtjZh6Hn26SKXjgzibNEwypw1MLjic1j6m1br2jGFCfPg/132',name:'console.log'},
    {img:'https://wx.qlogo.cn/mmhead/gGOplQlWUI7Zic3licKvzpoia2GYc5Sq77hxZZwxpkYHhg/132',name:'林木康'},
  ]
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
  watchCount:any = 5
  //收集bpm序列
  allBpmCollect:any = []

  //BPM目标段区间配置值
  BPMdurTarget:Array<any> = [
    [60,100],
    [70,120],
    [60,100],
    [80,110],
    [70,90],
    [80,100],
    [80,90],
    [70,110],
    [80,100],
    [85,110],
    [90,120],
    [80,110],
    [80,120],
    [70,100],
    [50,100],
    [85,110],
    [90,120],
    [80,100],
    [85,110],
    [90,120],
    [80,110],
    [80,120],
    [70,100],
    [70,120],
    [80,100],
    [85,110],
    [90,120],
    [80,110],
    [80,120],
    [70,100],
    [60,100],
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
  timer:any
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
    this.compWatchCount()
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
      }
    )
    //视频over
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          console.log('video-over')
          clearInterval(this.timer)
          utils.sessionStorageSetItem('allCollectBpm',this.allBpmCollect)
          utils.sessionStorageSetItem('allCal',this.totalCal)
          utils.sessionStorageSetItem('trainTime',this.trainTime)
          this.blue.completeTraining() //回调完成
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
  // 计算当前观看人数
  compWatchCount(){
    setInterval(() => {
      this.watchCount = Math.floor((Math.random()*100)+5);
      this.roundUseList = this.getRandomArray(this.userList, Math.floor(Math.random() * 3 ) + 5)
    },15000)
  }
  getRandomArray(arr,num){
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return return_array;
  }
  // 计算kal
  computeCal(){
    // this.targetCal = 50
    let totalCalComp = 0
    let timeItemCal = (this.targetCal / this.api.duration)
    console.log('computeCal',this.api.duration,timeItemCal,)

    let a = (this.api.duration/60).toFixed(2)
    this.trainTime = a.replace(a[a.indexOf('.')],':')
    this.timer = setInterval(()=>{
      if(totalCalComp > this.targetCal){
        clearInterval(this.timer)
      } else {
        totalCalComp += timeItemCal
        this.totalCal = parseInt(totalCalComp.toFixed(0))
        if(totalCalComp > 1000){
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
            that.blue.unRegisterListener('training')
            clearInterval(that.timer)
            that.ngZone.run(() => {
              that.nav.navigateForward(['/index'],{ queryParams:{ id:'list'} })
            })
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
