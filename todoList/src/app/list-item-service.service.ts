import { Injectable } from '@angular/core';
import { MOCK_TODO_LIST } from './mock';
@Injectable({
  providedIn: 'root'
})
export class ListItemServiceService {

  constructor() { 

  }
  getMockTodoList(): string[] {
    return MOCK_TODO_LIST;
  }
}
