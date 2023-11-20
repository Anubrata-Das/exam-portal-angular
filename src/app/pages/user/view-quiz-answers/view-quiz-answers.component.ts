import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-answers',
  templateUrl: './view-quiz-answers.component.html',
  styleUrls: ['./view-quiz-answers.component.css']
})
export class ViewQuizAnswersComponent implements OnInit{

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
  
  ngOnInit(): void {
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

}
