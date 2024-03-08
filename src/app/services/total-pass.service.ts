import { Injectable } from '@angular/core';
import { Student, TotalCalculate } from '../interface/studentInterface';

@Injectable({
  providedIn: 'root'
})
export class TotalPassService implements TotalCalculate {

  getTotalCalculation(list:Student[]): number {
      return list.filter(passStudent => passStudent.percentage > 60).length

  }


}
