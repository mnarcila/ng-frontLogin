import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  sendLogin():void{
    this.router.navigate(["login"]);
  }
  constructor(
    private auth: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    console.log("table-list:"+this.auth.isLoggedIn);
    if(this.auth.isLoggedIn==false){
      this.sendLogin();
    }
  }

}
