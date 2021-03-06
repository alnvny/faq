import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router,ActivatedRoute,Params }   from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent implements OnInit {
  faqName:string;
  questionList:any;
  allqa:any;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  defaultPanel:boolean=true;
  mainPanel:boolean = false;
  SearchValue:string;
  recentSearch:any;
  showCancel:boolean = false;
  popularSearch:any;
  showSpinner:boolean = true;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  diameter = 50;
  constructor(private api: AppService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.faqName = params['category'];
      this.api.get('/list/'+this.faqName).subscribe(data =>{
        this.showSpinner = false;
        if(this.faqName === 'Security'){
          let a = data.faq[0].questions[1].question.replace(/\n/g,'');
          data.faq[0].questions[1].question = a;
        }
        this.questionList = data.faq[0].questions;
      });
    })
    this.api.get('/search').subscribe(data =>{
      this.allqa = data.questions;
      this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(q => q ? this.filterQues(q) : this.allqa.slice())
      );
    });
    this.api.get('/popular-search').subscribe(data =>{
      this.popularSearch = data.popularSearch;
    });
    this.recentSearch = this.api.getQA();
  }

  filterQues(name: string){
    return this.allqa.filter(q=>q.ques.toLowerCase().indexOf(name.toLowerCase()) >= 0)
  }

  getIndex(index){
    let i = index;
    let payload={"ques":this.questionList[i].question,"ans":this.questionList[i].answer,"id":this.questionList[i].q_id};
    this.api.setQA(payload);
    this.router.navigate(['/detail',this.questionList[i].question,this.questionList[i].answer,this.faqName,this.questionList[i].q_id]);
  }

  

  getBack(){
    this.router.navigate(['/']);
  }
 

  clicked(){
    this.router.navigate(['/search']);
    var a  = "clicked";
    this.defaultPanel =true;
    this.mainPanel = false;
    this.showCancel = true;
  }

 
  typed(){
    this.recentSearch = this.api.getQA();
    if(this.SearchValue ===''){
      this.defaultPanel =true;
      this.mainPanel = false;
    }else{
    var b = "typed";
    this.mainPanel = true;
    this.defaultPanel = false;
    }
  }

}
