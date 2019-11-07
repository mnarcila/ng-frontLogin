import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router';
interface myData {
  success: boolean,
  message: string
}

@Injectable()
export class AuthService {
  private router: Router;
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  //private loggedName = JSON.parse(localStorage.getItem('loggedName') || 'nn');

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus);
  }

  setLoggedName(name: string){
    localStorage.setItem('loggedName',name);
  }
  
  getLoggedName():string{
    return localStorage.getItem('loggedName') ;
  }
  
}


