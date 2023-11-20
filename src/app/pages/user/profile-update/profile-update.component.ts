import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit{
  uId:any;
  user:any;

  constructor(private _route:ActivatedRoute,private _user:UserService, private _snack:MatSnackBar
    ,private router:Router){}

    

  ngOnInit(): void {
    this.uId=this._route.snapshot.params['uid'];
    // alert(this.uId);
    this._user.getSingleUser(this.uId).subscribe(
      (data: any)=>{
        this.user=data;
        console.log(this.user);
        
      },
      (error: any)=>{
        console.log(error);
        
      }
    )
    
  }

  public updateData(){
    if(this.user.username.trim()=='' || this.user.username==null){
      this._snack.open("Username Required !!",'',{
        duration:900,
        verticalPosition:'top'
      });
      return;
    }

    this._user.updateUser(this.user).subscribe(
      (data:any)=>{
        Swal.fire("Success !!",'Profile updated','success').then((e)=>{
          // this.router.navigate(['/admin/quizzes'])
        })
      },
      (error:any)=>{
        console.log(error);
        
        Swal.fire("Error !!",'Server error','error')
      }
    )
  }
}

