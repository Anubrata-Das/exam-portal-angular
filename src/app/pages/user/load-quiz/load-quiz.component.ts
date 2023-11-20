import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  p:number=1;
  itemsPerPage:number=9;
  totalQuizzes:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService){
    
  }

  ngOnInit(): void {
    

    this._route.params.subscribe((params) => {
      this.catId=params['catId'];

      if(this.catId == 0){
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.totalQuizzes = data.length;
            this.quizzes = data;
            // console.log(this.quizzes);
            
          },
          (error:any)=>{
            console.log("Error loading all quizzes");
            
          }
        )
        
      }
      else{
        console.log("Load specific quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any)=>{
            this.quizzes=data;
          },
          (error:any)=>{
            alert("Error in loading");
          }
        )
      }
    });
    
  }
}
