import { Observable } from "rxjs";

export interface Student {
    id:number
    name:string,
    percentage:number
}

export interface StudentDetails extends  Student {
    class:number,
    section:string,
    age:number,
    height:number,
}

export abstract class GetStudent {
   abstract getStudentList():Observable<Student[]>;
}

export abstract class GetStudentById  extends GetStudent{
    abstract studentDataById(id: number): Observable<StudentDetails>;
}

export interface TotalCalculate{
    getTotalCalculation(list:Student[]):void;
}