import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[
    {
      cid:744,
      title:"Program"
    },
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  }

  constructor(private _cat:CategoryService,  private _snack:MatSnackBar, private _quiz:QuizService){}

  ngOnInit(): void {
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

  addQuiz(){
    // console.log(this.quizData);
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this._snack.open("Title Required !!",'',{
        duration:900,
        verticalPosition:'top'
      });
      return;
    }

    //validation


    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire("Success !!",'Quiz is added successfully','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
          cid:'',
          },
        };
          
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error','error');
      }
    );
    
  }


}
