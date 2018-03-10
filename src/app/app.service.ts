import { Injectable, EventEmitter } from '@angular/core';
import  {Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  qa:any;

  setQA(quas){
    this.qa = quas;
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
