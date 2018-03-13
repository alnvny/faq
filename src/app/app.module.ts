import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { JsonpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';


import {  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,} from '@angular/material';


import { AppComponent } from './app.component';
import { FaqComponent } from './faq/faq.component';
import { AppService } from './app.service';
import { SubComponent } from './sub/sub.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: FaqComponent },
  { path: 'sub/:category', component: SubComponent },
  { path: 'detail/:qu/:ans/:cat/:id', component: DetailComponent },
  { path: 'search', component: SearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    SubComponent,
    DetailComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpModule,
    BrowserAnimationsModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
   
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})


export class AppModule { }
