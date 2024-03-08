import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransformStudentDataService } from './transform-student-data.service';
import { GetStudent, GetStudentById, Student, StudentDetails } from '../interface/studentInterface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService implements GetStudent,GetStudentById {

  private readonly apiUrl = 'http://localhost:3000/studentList';

  constructor(
    private http: HttpClient,
    private dataTransformService: TransformStudentDataService
  ) { }
  viewStudentDetails =  new BehaviorSubject<number>(0)
  getStudentList(): Observable<Student[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(studentList => this.dataTransformService.transformStudentData(studentList))
    );
  }

  studentDataById(id:number): Observable<StudentDetails> {
    return this.http.get<StudentDetails>(`${this.apiUrl}/${id}`).pipe(
      map(studentDetails => studentDetails)
    );
  }

  setStudentDetails(studentDetailsId:number){
    this.viewStudentDetails.next(studentDetailsId)
  }

}
