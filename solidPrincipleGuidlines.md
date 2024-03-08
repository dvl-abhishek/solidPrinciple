# Solid Principle Project!

This project was based on the SOLID principle of angular.

This project is about the list of school students in a grid. In this project, we can sort the list by name, id and age.
We can also see all the details of every student


## Single Responsibility Principle (SRP):
Each component, service, and class should have only one responsibility.
Here student list and student details components should have different responsibilities to do.
Student list showing the list of students and student details showing the details of students.

#### Dashboard 
```
<div  class="row">
<div  class="cell">
<app-student-list></app-student-list>
</div>
<div  class="cell">
<app-student-details  *ngIf="studentService.viewStudentDetails  |  async"></app-student-details>
</div>
</div>
```
#### Student Details
````
@Component({
selector:  'app-student-details',
standalone:  true,
imports: [JsonPipe],
}],
templateUrl:  './student-details.component.html',
styleUrl:  './student-details.component.css'
})

export  class  StudentDetailsComponent  implements  OnInit{
constructor(private  studentService:StudentService,private  studentById:GetStudentById){}
studentDetails!:StudentDetails
ngOnInit():  void {
this.studentService.viewStudentDetails.subscribe((id:number)=>{
if(id){
this.studentById.studentDataById(id).subscribe((details:StudentDetails)=>{
if(details){
this.studentDetails  =  details
}})}})}
````
#### Students List
````
export  class  StudentListComponent  implements  OnInit {
constructor(private  studentService:StudentService,
public  sortingService:SortingService,
private  totalStudentService:  TotalStudentService,
private  totalPassStudentService:  TotalPassService,
private  getStudentAll:GetStudent
){}

studentList:Student[]=[];
totalPassInClass:number  =  0;
totalStudentInClass:number  =  0;
SortByName  =  new  SortByName();
SortById  =  new  SortById();
SortByAge  =  new  SortByAge();
ngOnInit():  void {
this.getStudentAll.getStudentList().subscribe((data:Student[]) => {
if(data.length  >  0){
this.studentList  =  data
}
});

}
````

#### Transform Structure
````
  
transformStudentData(users:  Student[]):  Student[] {
return  users.map(studentDetails  => ({
id:  studentDetails.id,
name:  studentDetails.name,
percentage:  studentDetails.percentage,
}));
}
````




## Open/Closed Principle (OCP)
OCP says that classes and interfaces should be open for extension but closed for modification.
In this, we have only one interface for sorting the student's list by name, id
and age.

````
sorting.ts 

export  interface  SortingFields {
sortFields(studentLis:  any):  void;
}
export  class  SortById  implements  SortingFields {
sortFields(studentList:  any):  void {
return  studentList.sort((a:  any, b:  any) => (a.id  >  b.id  ?  1  :  -1));
}
}
export  class  SortByName  implements  SortingFields {
sortFields(studentList:  any):  void {
return  studentList.sort((a:  any, b:  any) => (a.name  >  b.name  ?  1  :  -1));
}
} 
export  class  SortByAge  implements  SortingFields {
sortFields(studentList:  any):  void {
return  studentList.sort((a:  any, b:  any) => (a.age  >  b.age  ?  1  :  -1));
}
}

sorting.service.ts

@Injectable({
providedIn:  'root'
})
export  class  SortingService {
private  notificationStrategy!:  SortingFields;
  
sortingListStrategy(strategy:  SortingFields) {
this.notificationStrategy  =  strategy;
}
public  sortList(list:  any):  void {
return  this.notificationStrategy.sortFields(list);
}
}


student-list.component.ts

SortByName  =  new  SortByName();
SortById  =  new  SortById();
SortByAge  =  new  SortByAge();
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
````


## Liskov Substitution Principle (LSP)
Here in this project, we create an interface that we use to create two services that both have different work and use those services in components.
One service is used to calculate the total of students and the second for the total number of the pass students.
These codes follow the Liskov instructions.

````
studentInterface.ts
export  interface  TotalCalculate{
getTotalCalculation(list:Student[]):void;
}

@Injectable({
providedIn:  'root'
})
export  class  TotalPassService  implements  TotalCalculate {
  
getTotalCalculation(list:Student[]):  number {
return  list.filter(passStudent  =>  passStudent.percentage  >  60).length
}
}
@Injectable({
providedIn:  'root'
})
export  class  TotalStudentService  implements  TotalCalculate { 
getTotalCalculation(list:Student[]):  number {
return  list.length
}
````

## Interface Segregation Principle (ISP)

This project is interacting with two different services both providing different functionality and it only depends on the interfaces they use not on the service.

````
studentInterface.ts

export  interface  Student {
id:number
name:string,
percentage:number
}
  
export  interface  StudentDetails  extends  Student {
class:number,
section:string,
age:number,
height:number,
}
@Injectable({
providedIn:  'root',
})
]

student.service.ts

export  class  StudentService  implements  GetStudent,GetStudentById {
  
private  readonly  apiUrl  =  'http://localhost:3000/studentList';
  
constructor(
private  http:  HttpClient,
private  dataTransformService:  TransformStudentDataService
) { }
viewStudentDetails  =  new  BehaviorSubject<number>(0)
getStudentList():  Observable<Student[]> {
return  this.http.get<any[]>(this.apiUrl).pipe(
map(studentList  =>  this.dataTransformService.transformStudentData(studentList))
);
}
  
studentDataById(id:number):  Observable<StudentDetails> {
return  this.http.get<StudentDetails>(`${this.apiUrl}/${id}`).pipe(
map(studentDetails  =>  studentDetails)
);
}
````

## Dependency Inversion Principle (DIP)

In this, we follow the high-level modules that should not depend on low-level modules. Both should depend on abstractions.
Here are two classes that get all the list of students and student data by ID which is used by the services and after then the component. 


````

studentInterface.ts

export  abstract  class  GetStudent {
abstract  getStudentList():Observable<Student[]>;
}
  
export  abstract  class  GetStudentById  extends  GetStudent{
abstract  studentDataById(id:  number):  Observable<StudentDetails>;
}

student.service.ts

@Injectable({
providedIn:  'root',
})
export  class  StudentService  implements  GetStudent,GetStudentById {
private  readonly  apiUrl  =  'http://localhost:3000/studentList';
constructor(
private  http:  HttpClient,
private  dataTransformService:  TransformStudentDataService
) { }
viewStudentDetails  =  new  BehaviorSubject<number>(0)
getStudentList():  Observable<Student[]> {
return  this.http.get<any[]>(this.apiUrl).pipe(
map(studentList  =>  this.dataTransformService.transformStudentData(studentList))
);
}
  
studentDataById(id:number):  Observable<StudentDetails> {
return  this.http.get<StudentDetails>(`${this.apiUrl}/${id}`).pipe(
map(studentDetails  =>  studentDetails)
);
}
````
## More Information

Git link https://github.com/dvl-abhishek/solidPrinciple


