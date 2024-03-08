import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { GetStudent, Student } from '../../interface/studentInterface';
import { NgFor } from '@angular/common';
import { SortByName, SortById ,SortByAge } from '../../interface/sorting';
import { SortingService } from '../../services/sorting.service';
import { TotalStudentService } from '../../services/total-student.service';
import { TotalPassService } from '../../services/total-pass.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor],
  providers:[{
    provide:GetStudent,
    useClass:StudentService
  }],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  constructor(private studentService:StudentService,
    public sortingService:SortingService,
    private totalStudentService: TotalStudentService,
    private totalPassStudentService: TotalPassService,
    private getStudentAll:GetStudent
    ){}
  studentList:Student[]=[];
  totalPassInClass:number = 0;
  totalStudentInClass:number = 0;
  SortByName = new SortByName();
  SortById = new SortById();
  SortByAge = new SortByAge();
  
  ngOnInit(): void {
      this.getStudentAll.getStudentList().subscribe((data:Student[]) => {
        if(data.length > 0){
         this.studentList = data
        }
      });
  }

  viewDetails(id:number){
    this.studentService.setStudentDetails(id)
  }

  filterName() {
    this.sortingService.sortingListStrategy(this.SortByName);
      this.sortingService.sortList(this.studentList)
  }

  filterId() {
    this.sortingService.sortingListStrategy(this.SortById);
      this.sortingService.sortList(this.studentList)
  }

  filterAge(){
    this.sortingService.sortingListStrategy(this.SortByAge);
    this.sortingService.sortList(this.studentList)
  }

  totalStudent(){
  this.totalStudentInClass =  this.totalStudentService.getTotalCalculation(this.studentList)
  }

  totalPassStudent(){
    this.totalPassInClass = this.totalPassStudentService.getTotalCalculation(this.studentList)
  }

}
