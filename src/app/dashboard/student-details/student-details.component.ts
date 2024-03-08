import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { GetStudentById, StudentDetails } from '../../interface/studentInterface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [JsonPipe],
  providers:[{
    provide:GetStudentById,
    useClass:StudentService
  }],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent  implements OnInit{

constructor(private studentService:StudentService,private studentById:GetStudentById){}

  studentDetails!:StudentDetails
  ngOnInit(): void {
    this.studentService.viewStudentDetails.subscribe((id:number)=>{
      if(id){
        this.studentById.studentDataById(id).subscribe((details:StudentDetails)=>{
          if(details){
            this.studentDetails = details
          }
        })
      }
    })
  }


}
