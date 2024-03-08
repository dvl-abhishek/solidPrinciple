import { Injectable } from '@angular/core';
import { SortingFields } from '../interface/sorting';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  private notificationStrategy!: SortingFields;

  sortingListStrategy(strategy: SortingFields) {
    this.notificationStrategy = strategy;
  }
  public sortList(list: any): void {
    return this.notificationStrategy.sortFields(list);
  }
}
