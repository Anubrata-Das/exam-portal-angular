import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{
  p:number=1;
  itemsPerPage:number=6
  totalQuizzes:any;

  constructor(private category:CategoryService){}

  ngOnInit(): void {
    this.category.categories().subscribe((data:any)=>{
      this.categories=data;
      this.totalQuizzes = data.length;
      console.log(this.categories);
      
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !","Error in loading data",'error');
      
    }   
    );
  }

  categories = [
    {
      cid:23,
      title:'pp',
      description:'bjnk',
    },
  ];

}
