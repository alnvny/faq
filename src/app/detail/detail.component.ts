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
  id:any;
  constructor(private api: AppService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
     // this.qa = params['qa'];
      this.question = params['qu'];
      this.answer =  params['ans'];
      this.sub = params['cat'];
      this.id = params['id'];
      if(this.id){
      var a = '/log/'+this.id+'/view';
      this.api.get(a).subscribe(data =>{
        if(data.status === 200){
          console.log("successfully added");
        }
      })
    }
      
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

  buttonClicked(value){
    this.hideThumbs = true;
    var a = '/log/'+this.id+'/helpful/'+value;
    this.api.get(a).subscribe(data =>{
      if(data.status === 200){
        console.log("successfully added");
      }
    })
  }

 

  getBack(){
    if(this.sub ===''){
    this.router.navigate(['/']);
    }else{
    this.router.navigate(['/sub',this.sub]);
    }
  }
 
 


}
