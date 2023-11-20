import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  qId=0;
  question:any;
  public Editor = ClassicEditor


  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _question:QuestionService, private _snack:MatSnackBar
    ,private router:Router, private _location:Location){}

  ngOnInit(): void 
  {

    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId)
    this._question.getQuestion(this.qId).subscribe(
      (data:any)=>{
        this.question = data;
        console.log(this.question);
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data','error');
      }
    )
    
  }

  //update form submit
    //update form sybmit
    public updateData(){
      if(this.question.content.trim()=='' || this.question.content==null){
        this._snack.open("Title Required !!",'',{
          duration:900,
          verticalPosition:'top'
        });
        return;
      }
  
      this._question.updateQuestion(this.question).subscribe(
        (data:any)=>{
          Swal.fire("Success !!",'question updated','success').then((e)=>{
            this._location.back();
            // this.router.navigate(['/admin/view-questions/'])
          })
        },
        (error:any)=>{
          console.log(error);
          
          Swal.fire("Error !!",'Server error','error')
        }
      )
    }

}
