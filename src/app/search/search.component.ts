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
  searchPanel:boolean = false;
  popularSearch:any;
  showSpinner:boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  diameter = 30;

  constructor(private api: AppService, private router: Router) { }

  ngOnInit() {
    this.api.get('/search').subscribe(data =>{
      this.showSpinner = false;
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
    if(this.recentSearch!=0)
    {
      this.searchPanel=true;

    }
  }

  filterQues(name: string){
    return this.allqa.filter(q=>q.ques.toLowerCase().indexOf(name.toLowerCase()) >= 0)
  }


  searchClicked(id){
    
    let getQA = this.allqa;
    
    let payload={"ques":getQA[id-1].ques,"ans":getQA[id-1].ans,"id":getQA[id-1].id};
    this.api.setQA(payload);
    this.router.navigate(['/detail',getQA[id-1].ques,getQA[id-1].ans,"",getQA[id-1].id]);
    
    
  }

  getBack(){
    this.router.navigate(['/']);
  }
  recentSearchClicked(index){
    this.router.navigate(['/detail',this.recentSearch[index].ques,this.recentSearch[index].ans,"",this.recentSearch[index].id]);
  }

  clicked(){
    var a  = "clicked";
    this.defaultPanel =true;
    this.mainPanel = false;
    this.showCancel = true;
  }

  clear(){
    if(this.SearchValue ===''){
      this.router.navigate(['']);
    }else{
    var a = '/user-search/'+this.SearchValue+'/1';
    this.api.get(a).subscribe(data =>{
      if(data.status === 200){
        console.log("successfully added");
      }
    })
    this.router.navigate(['']);
  }
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
