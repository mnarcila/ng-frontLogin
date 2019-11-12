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
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    sessionStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus);
  }

  setLoggedName(name: string){
    sessionStorage.setItem('loggedName',name);
  }
  
  getLoggedName():string{
    return sessionStorage.getItem('loggedName') ;
  }
  
}


