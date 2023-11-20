import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData={
    username:'',
    password:'',
  };

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router,private dialog:MatDialog){}

  formSubmit()
  {
    console.log("Login button clicked");

    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open("username us required !!",'',{
        duration:900,
        verticalPosition:'top',
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("password us required !!",'',{
        duration:900,
        verticalPosition:'top',
      });
      return;
    }

    //request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login......
        this.login.loginUser(data.jwtToken);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect....ADMIN: admin dashboard
            //redirect....NORMAL: normal dashboard

            if(this.login.getUserRole()=="ADMIN"){
              //admin dashboard
              // window.location.href='/admin'
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }
            else if(this.login.getUserRole()=='NORMAl'){
              //user dashboard
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }
            else{
              this.login.logout();
              
            }
          }
        );
      },

      (error)=>{
        console.log("error");
        console.log(error);   
        this.snack.open("Invalid details !! Try again",'',{
          duration:900,
          verticalPosition:'top',
        });    
      }
    );
  }

  //forgot password module
  openForgotPasswordModal() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '550px',
      // height:'300px' // Adjust the width as needed
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed (e.g., after the modal is closed)
      this.router.navigate(['/login']);
    });

  }
}
