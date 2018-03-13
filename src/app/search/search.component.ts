import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router }   from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
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

  constructor(private api: AppService, private router: Router) { }

  ngOnInit() {
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


  searchClicked(id){
    let getQA = this.allqa;
    let payload={"ques":getQA[id-1].ques,"ans":getQA[id-1].ans};
    this.api.setQA(payload);
    this.router.navigate(['/detail',getQA[id-1].ques,getQA[id-1].ans,"",getQA[id-1].id]);
  }

  getBack(){
    this.router.navigate(['/']);
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
    this.router.navigate(['']);
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
