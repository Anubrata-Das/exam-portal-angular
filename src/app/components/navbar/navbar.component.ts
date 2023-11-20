import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isloggedIn = false;
  user = this.login.getUser();

  constructor(public login:LoginService, private _route:ActivatedRoute,private router:Router){}

  ngOnInit():void{
    this.isloggedIn = this.login.isloggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isloggedIn = this.login.isloggedIn();
      this.user = this.login.getUser();
    })
  }

  public logout(){
    this.login.logout();
    window.location.reload();
    // this.router.navigate(['/']);
    
  }

}
