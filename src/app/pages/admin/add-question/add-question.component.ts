import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  public Editor = ClassicEditor

  qId:any;
  qTitle:any;
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

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _quiz:QuizService,
    private _snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle =this._route.snapshot.params['title'];
    this.question.quiz['qId']=this.qId;
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

    //form submit
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
