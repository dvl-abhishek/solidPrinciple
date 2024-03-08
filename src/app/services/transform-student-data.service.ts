import { Injectable } from '@angular/core';
import { Student, } from '../interface/studentInterface';

@Injectable({
  providedIn: 'root'
})
export class TransformStudentDataService {

  transformStudentData(users: Student[]): Student[] {
    return users.map(studentDetails => ({
      id: studentDetails.id,
      name: studentDetails.name,
      percentage: studentDetails.percentage,
    }));
  }
}
