import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
// import { Toast } from '@ionic-native/toast/ngx';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable() //组件可注入
export class nativeService {
  private loading: any = '';
  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    // private toast: Toast,
    private file : File,
    private imagePicker: ImagePicker,
    private camera: Camera,
  ){}
  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }
  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 只有一个确定按钮的弹出框.
   * 如果已经打开则不再打开
   */
  async alert(header: string, message = '', callBackFun = null){
    let isExist = false;
    if (!isExist) {
        isExist = true;
        const alertCtrl  = await this.alertCtrl.create({
          header,
          message,
          cssClass: 'alert-zIndex-highest',
          buttons: [{
            text: '确定', handler: () => {
              isExist = false;
              callBackFun && callBackFun();
            }
          }],
        //   enableBackdropDismiss: false
        })
        await alertCtrl.present()
      }
  };

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param classStyle 主题颜色  primary 天蓝， secondary 深蓝，danger，light，dark
   * @param duration 显示时长
   */
  async showToast(message = '操作完成', classStyle:string,duration = 2000,) {
    const toastCtrl = await this.toastCtrl.create({
      message,
      duration,
      position: 'top',
      color:classStyle,
      // showCloseButton: false
    })
    await toastCtrl.present()
  }

    /**
   * 统一调用此方法显示loading
   * @param message 显示的内容
   */
  async showLoading(message = '') {
    if (this.loading) {// 如果loading已经存在则不再打开
      return;
    }
    this.loading = await this.loadingCtrl.create({
        message
    });
    await this.loading.present();
  }

  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loading && this.loadingCtrl.dismiss();
    this.loading = null;
  }
  chooseFile(): any{
    //判断文件夹是否存在 不存在创建 这里必须是外部文件 巨坑无比
    console.log(this.file, this.file.externalDataDirectory)
    // this.file.checkDir(this.file.externalDataDirectory,"")
    //          .then(_ => console.log('Directory exists'))
    //          .catch(err => {
    //                 this.file.createDir(this.file.externalDataDirectory,"",true)
    //                 .then(result=>{console.log("success")})
    //                 .catch(err=>{console.log("err:"+JSON.stringify(err))
    //                })
    // });
    this.file.readAsText(this.file.externalCacheDirectory, '').then((res) => {
      //将JSON字符变成JSON对象
      let json = JSON.parse(res);
      console.log(json);
    },(res)=>{
      console.log('fail',res)
    })
  }
  imageLocal():any{
    const options:object = {
      maximumImagesCount:1,
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }
  mediaLocal():any{
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        console.log('success',imageData);
        }, (err) => {
        console.log('fail',err);
        // Handle error
    });
  }
}



