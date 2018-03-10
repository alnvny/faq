import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router,ActivatedRoute,Params }   from '@angular/router';
@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent implements OnInit {
  faqName:string;
  questionList:any;
  constructor(private api: AppService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.faqName = params['category'];
      this.api.get('/list/'+this.faqName).subscribe(data =>{
        if(this.faqName === 'Security'){
          let a = data.faq[0].questions[1].question.replace(/\n/g,'');
          data.faq[0].questions[1].question = a;
        }
        this.questionList = data.faq[0].questions;
      });
    })

  }

  getIndex(index){
    let i = index;
    this.api.setQA(this.questionList[i]);
    this.router.navigate(['/detail',this.questionList[i].question,this.questionList[i].answer]);
  }

}
