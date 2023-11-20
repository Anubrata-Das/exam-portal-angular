import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  //add user
  public addUser(user: any){
    return this.http.post(`${baseUrl}/user/`,user);
  }

  //get all user details
  public getAllUsers(){
    return this.http.get(`${baseUrl}/user/all`);
  }

  //delete user14q
  public deleteUser(uid:any){
    return this.http.delete(`${baseUrl}/user/${uid}`,)
  }

  //reset password
  public sendEmail(emaildata: any) {
    return this.http.post(`${baseUrl}/email/send`,emaildata);
  }

  //update user
  public updateUser(user:any){
    return this.http.put(`${baseUrl}/user/update`,user);
  }

  //get single user
  public getSingleUser(uid:any){
    return this.http.get(`${baseUrl}/user/single/${uid}`);
  }
}
