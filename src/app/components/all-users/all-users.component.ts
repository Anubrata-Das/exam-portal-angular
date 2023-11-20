import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  totalusers:any;
  uid:any;

  users:any;

  constructor(private _user:UserService){}

  
  ngOnInit(): void {
    this._user.getAllUsers().subscribe(
      (data:any)=>{
        this.users=data;
        this.totalusers=data.length;
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data','error');
      }
    )
  }

  deleteUser(uid: any){
    alert(uid);
    // Swal.fire({
    //   icon:'warning',
    //   title:"Are you Sure to delete ?",
    //   confirmButtonText:'Delete',
    //   showCancelButton:true,
    // }).then((result)=>{

    //   if(result.isConfirmed){
    //     //delete
    //     this._user.deleteUser(uid).subscribe(
    //       (data:any)=>{
    //         this.users= this.users.filter((user)=>users.uid != uid);
    //         Swal.fire('Success !','Quiz deleted','success');
            
    //       },
    //       (error:any)=>{
    //         console.log(error);
    //         Swal.fire('Error !','Error in loading data','error');
    //       }
    //     );
    //   }
    // })
  }

}
