import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  question:any;
  // i:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  totalmarks=0;

  isSubmit = false;

  timer:any;

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService){}


  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.question=data;

        this.timer = this.question.length*60/3; //per question 20 seconds 

        // this.question.forEach((q: any)=>{
        //   q['givenAnswer']='';
        // })
        // console.log(this.question);
        this.startTimer();
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error','error')
      }
    )
  }

  preventBackButton(){
    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Want to Submit the Quiz ?',
    
      showCancelButton:true,
      confirmButtonText:'Submit',
      denyButtonText:'Not now',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed)
      {
        this.evalQuiz();
      }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60)
    let ss = this.timer - mm*60
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){

    
    this._question.evalQuiz(this.question).subscribe(
      (data:any)=>{
        // console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit=true;

        this.totalmarks=this.question[0].quiz.maxMarks;
      },
      (error)=>{
        console.log(error);
        
      }
    )
      //   this.isSubmit=true;
    //     this.question.forEach((q: any)=>{
    //       if(q.givenAnswer == q.answer){
    //         this.correctAnswers++;
    //         let marksSingle = this.question[0].quiz.maxMarks/this.question.length;
    //         this.marksGot+=marksSingle;
    //       }

    //       if(q.givenAnswer.trim() != ''){
    //         this.attempted++;
    //       }
    //     })
    //     console.log(" Correct "+this.correctAnswers);
    //     console.log(" marks "+this.marksGot);
  }
  printPage(){
    window.print();
  }

}
