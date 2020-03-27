import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  //设置一个域名，为了好维护
    public config:any={
      //域名：
      domain:''
    }
  
    constructor(public http: HttpClient) {
    }
   
    //封装了一个get请求
    ajaxGet(url:any) {
      var api= this.config.domain + url;
      return new Promise((resolve, reject) => {
        this.http.get(api).subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        })
      })
    }
    //封装了一个post请求 
    ajaxPost(url:String, json:Object) {
      var api = this.config.domain + url;
      return new Promise((resove, reject) => {
        this.http.post(api, json).subscribe((response) => {
          resove(response);
        }, (error) => {
          reject(error);
        })
      })
    }
  }
