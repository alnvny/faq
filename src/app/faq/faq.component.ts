import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  Router }   from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqList:any;

  constructor( private api: AppService, private router: Router) { }

  ngOnInit() {
    this.api.get('/list').subscribe(data =>{
      this.faqList = data.category;
    });
  }

  faqClicked(faq:String){
    let convertToLowerCase = faq.toLowerCase();
    this.router.navigate(['/sub',convertToLowerCase]);
  }

}
