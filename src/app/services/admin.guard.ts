// import { CanActivateFn } from '@angular/router';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn:'root'
})

export class AdminGuard implements CanActivate {
  constructor(private login:LoginService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean {

      if(this.login.isloggedIn() && this.login.getUserRole()=='ADMIN'){
        return true;
      }

      this.router.navigate(['login'])
      return false;
    }
  }