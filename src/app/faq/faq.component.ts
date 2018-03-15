import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router }   from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqList:any;
  allqa:any;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  defaultPanel:boolean=true;
  mainPanel:boolean = false;
  SearchValue:string;
  recentSearch:any;
  showCancel:boolean = false;
  popularSearch:any;
  showSpinner:boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  diameter = 30;
  constructor( private api: AppService, private router: Router) { }

  ngOnInit() {
    this.api.get('/list').subscribe(data =>{
      this.faqList = data.category;
    });
    this.api.get('/search').subscribe(data =>{
      this.allqa = data.questions;
      this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
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




  isOpen:true;

  faqClicked(faq:String){
    this.showSpinner = true;
    let convertToLowerCase = faq.toLowerCase();
    this.router.navigate(['/sub',convertToLowerCase]);
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
