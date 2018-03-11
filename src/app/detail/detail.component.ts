import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router,ActivatedRoute,Params }   from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

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
  parentUrl:any;
  sub:any;
  allqa:any;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  defaultPanel:boolean=true;
  mainPanel:boolean = false;
  SearchValue:string;
  recentSearch:any;
  showCancel:boolean = false;
  popularSearch:any;
  constructor(private api: AppService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
     // this.qa = params['qa'];
      this.question = params['qu'];
      this.answer =  params['ans'];
      this.sub = params['cat'];
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

  buttonClicked(){
    this.hideThumbs = true;
  }

  searchClicked(id){
    let getQA = this.allqa;
    this.router.navigate(['/detail',getQA[id-1].ques,getQA[id-1].ans,""]);
  }

  getBack(){
    if(this.sub ===''){
    this.router.navigate(['/']);
    }else{
    this.router.navigate(['/sub',this.sub]);
    }
  }

  recentSearchClicked(index){
    this.router.navigate(['/detail',this.recentSearch[index].ques,this.recentSearch[index].ans,""]);
  }

  clicked(){
    var a  = "clicked";
    this.defaultPanel =true;
    this.mainPanel = false;
    this.showCancel = true;
  }

  clear(){
    this.SearchValue='';
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
