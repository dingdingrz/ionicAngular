import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl  } from '@angular/forms';

@Component({
  selector: 'app-operate-box',
  templateUrl: './operate-box.component.html',
  styleUrls: ['./operate-box.component.css']
})
export class OperateBoxComponent implements OnInit {
  @Output() addTodoItem = new EventEmitter<string>();
  newItem = new FormControl('');
  constructor() { }
  
  addItem() {
    if (this.newItem) {
      this.addTodoItem.emit(this.newItem.value);
      this.newItem.reset()
    }
  }
  ngOnInit(): void {
  }

}
