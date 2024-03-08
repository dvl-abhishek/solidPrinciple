export interface SortingFields {
    sortFields(studentLis: any): void;
  }
  
  export class SortById implements SortingFields {
    sortFields(studentList: any): void {
      return studentList.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
    }
  }
  
  export class SortByName implements SortingFields {
    sortFields(studentList: any): void {
      return studentList.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
    }
  }

  export class SortByAge implements SortingFields {
    sortFields(studentList: any): void {
      return studentList.sort((a: any, b: any) => (a.age > b.age ? 1 : -1));
    }
  }