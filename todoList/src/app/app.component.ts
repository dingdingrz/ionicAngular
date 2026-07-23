import { Component } from '@angular/core';
import { ListItemServiceService } from './list-item-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoList';
  todoList: string[] = [];
  constructor(private listItemService: ListItemServiceService) {
    this.todoList = this.listItemService.getMockTodoList();
  }
  addTodoItem(item: string) {
    if(item.trim()) {
      console.log('Adding item:', item);
      this.todoList.push(item);
    }
  }
  deleteTodoItem(index: number) {
    console.log('Deleting item at index:', index);
    this.todoList.splice(index, 1);
  }
}
