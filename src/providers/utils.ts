import { Injectable } from '@angular/core';

@Injectable() //组件可注入
export class utils {

    constructor(){
        
    }
    static androidBackground:string = 'https://img.cdn.powerpower.net/5e60c05ce4b0ced1d05ddbf6.png'
    // 转rem
    static rem($px){
       return $px/(750/24) + 'rem'
    }
    //格式化视频时间
    static getFormatterTime(t:number) :string{
        let seconds:any =  Math.floor(t/60%60);//取分钟
        let min:any = Math.floor(t%60);//取秒
        if(seconds<10){
        seconds = "0"+seconds
        }
        if(min<10){
        min = "0"+min
        }
        return seconds+":"+min;
    }
    // session处理
    static sessionStorageGetItem(key: string) {
        const jsonString = sessionStorage.getItem(key);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    }
    static sessionStorageSetItem(key: string, value: any) {
       sessionStorage.setItem(key, JSON.stringify(value));
    }

    static sessionStorageRemoveItem(key: string) {
       sessionStorage.removeItem(key);
    }

    static sessionStorageClear() {
       sessionStorage.clear();
    }
    
    // localStrage
    static localStorageGetItem(key: string) {
        const jsonString = localStorage.getItem(key);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    }
    static localStorageSetItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static localStorageRemoveItem(key: string) {
        localStorage.removeItem(key);
    }

    static localStorageClear() {
        localStorage.clear();
    }
}