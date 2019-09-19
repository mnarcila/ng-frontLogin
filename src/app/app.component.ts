import { Component, OnInit ,NgModule} from '@angular/core';
import { Router, ActivatedRoute, RouteReuseStrategy } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import './app.less';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OMS-kallsonys';
  

  constructor() {
      
  }

  ngOnInit() { 
    
  }  
}


 

 