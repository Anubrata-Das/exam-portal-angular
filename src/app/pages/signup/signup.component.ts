import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService:UserService,private snack:MatSnackBar,private _router:Router){}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      // alert("User is required");
      this.snack.open("Username is Required !","",{
        duration:1000,
        verticalPosition:'top',
      })
      return;
    }

    // Validation using JavaScript

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data)
        // alert('success');
        Swal.fire('Successful','User id is '+data.id,'success');
        this._router.navigate(['/login']);
      },
      (error)=>{
        //error
        console.log(error);
        // alert('error');
        this.snack.open("Something went wrong !","",{
          duration:1000,
          verticalPosition:'top',
        })
      }
    )


  }


}
