// import { CanActivateFn } from '@angular/router';

// export const normalGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn:'root'
})

export class NormalGuard implements CanActivate {
  constructor(private login:LoginService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean {

      if(this.login.isloggedIn() && this.login.getUserRole()=='NORMAl'){
        return true;
      }

      this.router.navigate(['login'])
      return false;
    }
  }