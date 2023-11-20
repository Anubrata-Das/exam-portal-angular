import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient, private _router:Router) { }

  //current user who is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user:  set token in localstorage

  public loginUser(jwtToken: any){
    localStorage.setItem("jwtToken",jwtToken);
    
    return true;
  }

  // isLogin:  user is logged in or not
  public isloggedIn(){
    let tokenStr  = localStorage.getItem("jwtToken");
    if(tokenStr == undefined || tokenStr =='' || tokenStr == null){
      return false;
    }
    else{
      return true;
    }
  }

  //logout: remove token from local storage
  public logout(){
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    this._router.navigate(['/']);
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("jwtToken");
  }

  //set userDetail
  public setUser(user: any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //getuser
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user =this.getUser()
    return user.authorities[0].authority;
  }

}
