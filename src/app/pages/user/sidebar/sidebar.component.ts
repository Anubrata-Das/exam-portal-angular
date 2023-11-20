import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  p:number=1;
  itemsPerPage:number=6
  totalQuizzes:any;

  categories: any

  constructor(
    private _cat:CategoryService,
    private _snack: MatSnackBar
  ){}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.totalQuizzes = data.length;
        this.categories=data;
      },
      (error:any)=>{
        this._snack.open("Error loading categories ",'',{
          duration: 1000,
          verticalPosition:'top',
        })
      }
    )
  }

}
