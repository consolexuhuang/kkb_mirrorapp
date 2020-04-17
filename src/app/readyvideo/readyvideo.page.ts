import { Component, OnInit, ChangeDetectorRef,ViewChild, NgZone} from '@angular/core';
import { NavController} from '@ionic/angular'; //弹框
import { ActivatedRoute } from '@angular/router';


import {bluebooth} from '../../providers/bulebooth'
import { utils } from '../../providers/utils';
// import VConsole from 'vconsole';
// var vConsole = new VConsole();
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
    private route : ActivatedRoute

  ) { 
  }
  videoId:any
  srcImg:any = utils.androidBackground
  videoInfo:any = [
    {id:50, coursename:'BODYATTACK有氧挑战', coach:'Laura', banner:'https://img.cdn.powerpower.net/5e942357e4b0b9999a226d20.png', courseinfo:'BODYATTACK有氧挑战，将基础的跑跳动作，与徒手力量训练结合在一起。教练会在活动四射的音乐声中激励你完成训练，以科学的方式帮助你挑战自身极限，发现潜能，燃烧卡路里，带你带来运动后的成就感。', coursetags:['高强度','燃脂','徒手训练','热门课程']},
    {id:51, coursename:'BODYCOMBAT燃脂搏击', coach:'Lisa',banner:'https://img.cdn.powerpower.net/5e9423bbe4b0b9999a226d22.png', courseinfo:'BODYCOMBAT将搏击和有氧训练结合，动作和音乐经过顶级教练员、运动生理专家、编辑师精心研究，不仅安全有效，还易于掌握。无论是平时缺乏锻炼、身材娇小、体质瘦弱的白领女性，还是身体强壮的男性，都非常适合参与，通过课程达到燃脂瘦身，放松减压的目的。', coursetags:['高强度','燃脂','徒手训练','热门课程']},
    {id:52, coursename:'Yoga Flow流瑜伽-Vol.1', coach:'乐仔',banner:'https://img.cdn.powerpower.net/5e942430e4b0b9999a226d27.png', courseinfo:'流瑜伽是瑜伽的一种，侧重身体伸展柔韧性，力量与耐力，平衡与专注力。动作像行云流水一样，缓慢流畅。体式之间的衔接给人一气呵成的感觉。流瑜伽强调运动与呼吸的和谐性，每个动作停留3到5个呼吸。仔细体会身体的感受、专注力与动作流动的全面锻炼，让每个核心体式都能使用不同的连接体式（vinyasa）进行紧密串联，同时也穿插了快速地节拍性动作组合。', coursetags:['中强度','瑜伽','伸展','新手推荐']},
    {id:53, coursename:'Zumba尊巴-Vol.1', coach:'Lisa',banner:'https://img.cdn.powerpower.net/5e9423fee4b0b9999a226d25.png', courseinfo:'ZUMBA训练结合了各种舞蹈动作，不仅能锻炼身体的协调性，并且在有氧的过程中，心肺功能也将有所提高，燃烧大量脂肪。', coursetags:['中强度','燃脂','舞蹈','热门课程']}
  ]
  videoCurrentInfo:any
  updataSyncFun(){
    this.ref.markForCheck();
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
    // this.ref.detectChanges();
  }
  ionViewWillEnter(){
    this.StartCommandListener()
    console.log('ionViewWillEnter-readyvideo',utils.localStorageGetItem('videoCurrentId'))
    this.videoId = utils.localStorageGetItem('videoCurrentId')
    for(let i = 0; i<this.videoInfo.length; i++){
      if(this.videoInfo[i].id == this.videoId){
        this.videoCurrentInfo = this.videoInfo[i]
        console.log('videoCurrentInfo',this.videoCurrentInfo)
      }
    }
  }
  ngOnInit() {
    this.StartCommandListener()
    console.log('mirrorVideoState--init',utils.localStorageGetItem('videoCurrentId'))
    this.videoId = utils.localStorageGetItem('videoCurrentId')
    for(let i = 0; i<this.videoInfo.length; i++){
      if(this.videoInfo[i].id == this.videoId){
        this.videoCurrentInfo = this.videoInfo[i]
        console.log('videoCurrentInfo',this.videoCurrentInfo)
      }
    }
  }
  //开始接收
  StartCommandListener() {
    let that = this
    let collectArr:any = []
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","registerListener",['mirrorVideoState']);
    function callSuccess(message:any) {
      if(message.type == 'action'){
        console.log("receive command-readyvideo:  ", message)
        if(message.action == 60 || message.action == 61 || message.action == 62 || message.action == 63){ //播放
          that.ngZone.run(() => {
            that.nav.navigateForward(['/training'], { queryParams:{ id: message.action} })
          })
          that.blue.unRegisterListener('mirrorVideoState')
        }
        if(message.action == 20){ //显示视频列表
          // that.blue.Stop()
          that.ngZone.run(() => {
            that.nav.navigateForward(['/index'],{ queryParams:{ id:'list'} })
          })
          that.updataSyncFun()
          // that.blue.unRegisterListener('mirrorVideoState') //如果频繁的操作注册监听和，关闭监听，会出现发送发送命令失败的情况
        }
       }
       if(message.type == 'data'){ 
          // 监听收集心率, cal, xyz, a 1:bpm  3:three
          if(message.datatype == 1){
              // console.log('心率收集成功！')
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
