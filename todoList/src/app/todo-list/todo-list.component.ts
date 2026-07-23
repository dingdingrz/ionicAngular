import { Component, OnInit ,Input, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todoList: string[] = [];
  @Output() deleteItem = new EventEmitter<number>();
 constructor(private router: Router) {}
  activeIndex: number = -1;
  setActiveIndex(index: number) {
    this.activeIndex = index;
  }
  jumptoDetail(value:number){
    this.router.navigate(['/list-item-detail', value]);
  }
  ngOnInit(): void {
  }

}
