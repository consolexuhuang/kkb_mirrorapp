import { Injectable } from '@angular/core';

declare var cordova:any
@Injectable() //组件可注入

export class bluebooth {
  //停止接收
  unRegisterListener(key:any) {
    //    alert("test ");
      cordova.exec(callSuccess,callFail,"jjBandsPlugin","unRegisterListener",[key]);
      function callSuccess(message:any) {
          console.log('unRegisterListener success',message)
          // alert("unRegisterListener success:  " + message);
      }
      //失败后回调
      function callFail(message:any) {
          alert("unRegisterListener fail:  " + message);
      }

  }
  //开始
  Start(needRawXYZ:any) {
    //    alert("test ");
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","startMonitorBands",[needRawXYZ]);
    function callSuccess(message:any) {
        console.log('startMonitorBands',message)
        // alert("receive data:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
      console.log('startMonitorBandsFail',message)
        // alert("startMonitor fail:  " + message);
    }

  }
  // 停止
  Stop() {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","stopMonitorBands",null);
    function callSuccess(message:any) {
      console.log('stopMonitorBands',message)
      //  alert("stopMonitor success:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
      console.log('stopMonitorBandsFail',message)
        // alert("stopMonitor fail:  " + message);
    }

  }
   //发送
  SendMsg(command:any) {
    if(command)
        cordova.exec(callSuccess,callFail,"jjBandsPlugin","testSendCommand",[command]);
    else
        cordova.exec(callSuccess,callFail,"jjBandsPlugin","testSendCommand",null);

     function callSuccess(message:any) {
        alert("testSendCommand success:  " + message);
     }

     //失败后回调
     function callFail(message:any) {
         alert("testSendCommand fail:  " + message);
     }
  }
  //连接蓝牙
  ConnectBands() {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","connectBands",null);
    function callSuccess(message:any) {
       alert("testConnectBands success:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
        alert("testConnectBands fail:  " + message);
    }

  }
  //设置蓝牙地址（暂时用不到）
  setBandsAddress(address1:any, address2:any, address3:any, address4:any) {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","setBandsAddress",[address1,address2,address3,address4]);
    function callSuccess(message:any) {
       alert("setBandsAddress success:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
        alert("setBandsAddress fail:  " + message);
    }

  }
  // 获取蓝牙信息
  getBandsInfo() {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","getBandsInfo",null);
    function callSuccess(message:any) {
       console.log('getBandsInfo success:',message)
      //  alert("getBandsInfo success:  " + JSON.stringify(message));
    }
    //失败后回调
    function callFail(message:any) {
        alert("getBandsInfo fail:  " + message);
    }

  }
  //获取镜子信息
  // getMirrorName() {
  //   return new Promise((resolve,reject) => {
  //     cordova.exec(callSuccess,callFail,"jjBandsPlugin","getMirrorName",null);
  //     function callSuccess(message:any) {
  //       console.log('getMirrorName成功',message)
  //       //  alert("getMirrorName success:  " + message);
  //     }
  
  //     //失败后回调
  //     function callFail(message:any) {
  //         alert("镜子获取失败- " + message);
  //     }
  //   })

  // }
  // 获取用户信息
  getUserInfo() {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","getUserInfo",null);
    function callSuccess(message:any) {
       alert("getUserInfo success:  " + JSON.stringify(message));
    }

    //失败后回调
    function callFail(message:any) {
        alert("getUserInfo fail:  " + message);
    }

  }
  //训练完成
  completeTraining() {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","completeTraining",null);
    function callSuccess(message:any) {
      console.log('completeTraining success',message)
      //  alert("completeTraining success:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
        alert("completeTraining fail:  " + message);
    }

  }
  //指令
  sendMessage(cmd:any, arg1:any = null) {
    cordova.exec(callSuccess,callFail,"jjBandsPlugin","sendMessage",[cmd, arg1]);
    function callSuccess(message:any) {
      console.log('sendMessage success',message)
      //  alert("completeTraining success:  " + message);
    }
    //失败后回调
    function callFail(message:any) {
        alert("sendMessage fail:  " + message);
    }
  }
}