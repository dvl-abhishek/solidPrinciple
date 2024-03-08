import { Injectable } from '@angular/core';
import { Student, TotalCalculate } from '../interface/studentInterface';

@Injectable({
  providedIn: 'root'
})
export class TotalStudentService implements TotalCalculate {

  getTotalCalculation(list:Student[]): number {
    return list.length
  }


}
