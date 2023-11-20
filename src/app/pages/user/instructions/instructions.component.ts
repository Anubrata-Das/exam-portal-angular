import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  qid:any;
  quiz:any;
  somoy:any;
  

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router){}

  ngOnInit(): void {
    
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.quiz=data;
        this.somoy = Math.floor(this.quiz.numberOfQuestions/3)
      },
      (error:any)=>{
        alert('Error')
      }
    )
  }

  startQuiz(){
    Swal.fire({
      title:'Want to start the Quiz ?',
    
      showCancelButton:true,
      confirmButtonText:'Start',
      denyButtonText:'Not now',
      icon:'info',
    }).then((result)=>{
      if(result.isConfirmed){

        this._router.navigate(['/start/'+this.qid])
      }else{

      }
    })
  }

}
