import { Injectable, EventEmitter } from '@angular/core';
import  {Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  qa:any =[];

  setQA(quas){
    if(this.qa.length===0){
      this.qa.push(quas);
    }else if(this.qa.length === 5){
      for(var i = 0;i<this.qa.length;i++){
        if(this.qa[i].ques === quas.ques){
          return false;
        }
      }
    this.qa.pop();
    this.qa.unshift(quas);
    }else{
        for(var i = 0;i<this.qa.length;i++){
          if(this.qa[i].ques === quas.ques){
            return false;
          }
        }
        this.qa.unshift(quas);
        
      }
    }

  getQA(){
    return this.qa;
  }

  private base_URL = "http://trial.dexterlabz.ai/api/faq/list";
  constructor(private http:Http) {

   }
   get(url: string){
    return this.request(url, RequestMethod.Get)
  }

  request(Url: string, method: RequestMethod, body?: any,type?:string){
    const headers = new Headers;
    const requestOptions=new RequestOptions({
      url:"http://trial.dexterlabz.ai/api/faq"+Url,
      method: method
    });
    const request = new Request(requestOptions);
    if(requestOptions.url.includes('/api/log')){
      return this.http.request(request).map((res: Response) => res);  
    }else{
    return this.http.request(request).map((res: Response) => res.json());  
    }
  }
  

}
