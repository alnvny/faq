import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router,ActivatedRoute,Params }   from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  qa:any;
  question:string;
  answer:string;
  hideThumbs:boolean = false;
  constructor(private api: AppService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
     // this.qa = params['qa'];
      this.question = params['qu'];
      this.answer =  params['ans'];
    })
  }

  buttonClicked(){
    this.hideThumbs = true;
  }

}
