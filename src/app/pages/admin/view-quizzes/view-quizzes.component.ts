import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  p:number=1;
  itemsPerPage:number=4
  totalQuizzes:any;

  quizzes=[
    {
      qid:25656,
      title:"Basic Java Quiz",
      description:'1080p 2015 2016 3d',
      maxMarks:'100',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:"Program"
      }
    },
  ]
qid: any;

  constructor(private _quiz:QuizService){}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.totalQuizzes = data.length;
        this.quizzes = data;
        console.log(this.quizzes);
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data','error');
      }
    )
  }

  //delete quiz
  deleteQuiz(qid: any){
    // alert(qid);
    Swal.fire({
      icon:'warning',
      title:"Are you Sure to delete ?",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{

      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qid).subscribe(
          (data:any)=>{
            this.quizzes= this.quizzes.filter((quiz)=>quiz.qid != qid);
            Swal.fire('Success !','Quiz deleted','success');
            
          },
          (error:any)=>{
            console.log(error);
            Swal.fire('Error !','Error in loading data','error');
          }
        );
      }
    })
  }


}
