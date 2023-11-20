import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myquestion',
  templateUrl: './myquestion.component.html',
  styleUrls: ['./myquestion.component.css']
})
export class MyquestionComponent implements OnInit{

  constructor(private _quiz:QuizService,private _snack:MatSnackBar,private _question:QuestionService){}

  quizzes=[
    {
      qid:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category:{
        cid:'',
      },
    }
  ]

  question={
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:'',
    },
  };

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error','error');
      }
    )
  }

  formSubmit()
  {

    // alert("Submit")
    if(this.question.content.trim()=='' || this.question.content==null){
      this._snack.open("Content Required !!",'',{
        duration:900,
        verticalPosition:'top'
      });
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null){
      this._snack.open("option1 Required !!",'',{
        duration:900,
        verticalPosition:'top'
      });
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      this._snack.open("option2 Required !!",'',{
        duration:900,
        verticalPosition:'top'
      });
      return;
    }

    //form submit means call server
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success !!",'Question is added successfully','success');
          
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error','error');
      }
    );
  }

}
