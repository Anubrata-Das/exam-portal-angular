import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId:any;
  qTitle:any;
  questions=[
    {
      quesId:'',
      content:'Hello',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    }
  ]

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar){}


  ngOnInit(): void 
  {
    this.qId =this._route.snapshot.params['qid'];
    this.qTitle =this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
        
      },
      (error:any)=>{
        console.log(error);
        
      }
    )
    
  }

  //delete question
  deleteQuestion(qid:any){
    // alert(qid);
    Swal.fire({
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Sure to Delete this question'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            this._snack.open("Question Deleted!!",'',{
              duration:900,
              verticalPosition:'top'
            });
            this.questions=this.questions.filter((q)=>q.quesId != qid);
          },
          (error)=>{
            console.log(error);
            Swal.fire("Error !!",'Server error','error');
          }
        )
      }
    })
  }

}
