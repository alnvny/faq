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
    this.qa.push(quas);
    }else{
        for(var i = 0;i<this.qa.length;i++){
          if(this.qa[i].ques === quas.ques){
            return false;
          }
        }
        this.qa.push(quas);
        
      }
    }

  getQA(){
    return this.qa;
  }

  private base_URL = "http://dexterlabz.ai/faq/api/list";
  constructor(private http:Http) {

   }
   get(url: string){
    return this.request(url, RequestMethod.Get)
  }

  request(Url: string, method: RequestMethod, body?: any,type?:string){
    const headers = new Headers;
    const requestOptions=new RequestOptions({
      url:"http://dexterlabz.ai/faq/api"+Url,
      method: method
    });

    const request = new Request(requestOptions);
    return this.http.request(request).map((res: Response) => res.json());  
  }
  

}
