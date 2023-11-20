import { Component } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators,  } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
// import {GlobalConstants} from '../sha'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {
  forgotPasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(private dialogRef: MatDialogRef<ForgotPasswordComponent>, private user:UserService, private formBuilder:FormBuilder,
    private ngxService:NgxUiLoaderService,private snackbar:MatSnackBar) {
      
    }


    ngOnInit() {
      this.forgotPasswordForm=this.formBuilder.group({
        to:[null,[Validators.required,Validators.email]]
      })
    }
    data:any;
    emaildata={
      to:'',
      subject:'',
      body:'',
      otp:''
    };

    handleSubmit(){
        this.user.sendEmail(this.emaildata).subscribe(
          (data:any)=>{
            this.emaildata=data.value;
            console.log(this.emaildata);
            
            this.responseMessage=data?.message;
            this.snackbar.open(this.responseMessage,'',{
              duration:900,
              verticalPosition:'top',
            });
            // this.closeDialog();
            this.forgotPasswordForm.reset();
          },
          (error:any) => {
            this.emaildata=error.value;
            console.log(this.emaildata);
            this.responseMessage=error?.message;
            this.snackbar.open("OTP has ben Sent to your mail",'',{
              duration:1200,
            
              verticalPosition:'top',
            })
            // alert('Error sending email: ' + error);
          }
        );
    }

}
