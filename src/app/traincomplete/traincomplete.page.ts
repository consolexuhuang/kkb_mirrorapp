import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular'; 
import {bluebooth} from '../../providers/bulebooth'
import VConsole from 'vconsole';
import { utils } from '../../providers/utils';

var vConsole = new VConsole();
declare var cordova:any
@Component({
  selector: 'app-traincomplete',
  templateUrl: './traincomplete.page.html',
  styleUrls: ['./traincomplete.page.scss'],
})
export class TraincompletePage implements OnInit {

  constructor(
    public nav: NavController,
    private blue : bluebooth,
    // private utils: utils,
  ) { }
  srcImg:any = utils.androidBackground
  bpm:any
  cal:any
  dateList:any = []
  valueList:any = [66,70,63,73,77,70,75,80,84,88]
  chartOption: Object = {
    // Make gradient line here
    visualMap: [{
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400
    }],


    title: [{
        left: 'left',
        text: '心率分布',
        textStyle:{
          color:'#DDDDDD',
          fontSize:this.rem(30)
        }
    }],
    tooltip: {
        trigger: 'axis'
    },
    xAxis: [{
        axisLine:{
          show: false
        },
        data: []
    }],
    yAxis: [{
        max : 300,
        min : 0,
        splitNumber : 5,
        axisLine:{
          show: false
        },
        axisTick :{
          show: false
        },
        splitLine: {
          show: true,
          lineStyle:{
            color:'#fff',
            opacity:.5
          },
        },
        axisLabel:{
          fontSize:this.rem(22),
          color:'#999'
        }
    }],
    grid: [{
        bottom: '20%'
    }],
    series: [{
        type: 'line',
        showSymbol: false,
        data: utils.sessionStorageGetItem('allCollectBpm') || this.valueList,
        lineStyle:{
          width:3
        }
    }]
  }
  rem($px){
    return $px/(750/20) + 'rem'
  }
  ngOnInit() {
    this.StartCommandListener()
    this.compluteval()
  }
  // 计算平均数据
  compluteval(){
    let sum:any = 0
    if(utils.sessionStorageGetItem('allCollectBpm')) {
      utils.sessionStorageGetItem('allCollectBpm').forEach((ele:any) => {
        sum += ele;
      });
      this.valueList = utils.sessionStorageGetItem('allCollectBpm')
      this.bpm = (sum / utils.sessionStorageGetItem('allCollectBpm').length).toFixed(2)
    }
    if(utils.sessionStorageGetItem('allCal')){
      this.cal = utils.sessionStorageGetItem('allCal')
    }
  }
  //开始接收
  StartCommandListener() {
    let that = this
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","registerListener",['complete']);
    function callSuccess(message:any) {
      console.log("receive command-complete:  ", message)
        if(message.type == 'action'){
          if(message.action == 20){ //显示列表
            that.blue.unRegisterListener('complete')
            that.nav.navigateForward(['/index'],{ queryParams:{ id:'list'} })
          }
        }
      //  alert("receive command:  " + JSON.stringify(message))
    }
    //失败后回调
    function callFail(message:any) {
        alert("startCommandListener fail:  " + message);
    }
  }
}
