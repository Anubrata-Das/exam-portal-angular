import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

// const TOKEN_HEADER = 'Authorization'

@Injectable()
export class AuthInterCeptor implements HttpInterceptor{

    constructor(private login:LoginService){
        
    }
    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
            let authReq = req;
            //add the jwt token(Localstorage) request
            const token = this.login.getToken();

            console.log("Inside interceptor");
            
            if(token != null){
                authReq = authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
            }
            return next.handle(authReq);
    }
    
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterCeptor,
        multi:true,
    },
];