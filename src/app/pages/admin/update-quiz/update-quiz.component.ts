import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService, private _snack:MatSnackBar
    ,private router:Router){}

  qId=0;
  quiz:any;
  categories=[
    {
      cid:744,
      title:"Program"
    },
  ]

  ngOnInit(): void {
    
    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data','error');
      }
    );

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error','error');
      }
    );
  }

  //update form sybmit
  public updateData(){
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this._snack.open("Title Required !!",'',{
        duration:900,
        verticalPosition:'top'
      });
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success !!",'quiz updated','success').then((e)=>{
          this.router.navigate(['/admin/quizzes'])
        })
      },
      (error:any)=>{
        console.log(error);
        
        Swal.fire("Error !!",'Server error','error')
      }
    )
  }
}
