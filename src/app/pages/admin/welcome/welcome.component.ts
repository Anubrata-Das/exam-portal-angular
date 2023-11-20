import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user :any;
  constructor(public login:LoginService){}

  ngOnInit(): void {
    this.user =  this.login.getUser();
  }

}
