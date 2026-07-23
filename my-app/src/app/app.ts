import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { Test } from './test/test';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  parentValue = ['uu9984','adf']
  protected readonly title = signal('my-app');
  
  onParentValueChange(newValue: string[]) {
    console.log('父组件接收到子组件的值变化:', newValue);
    this.parentValue = [...this.parentValue,...newValue]; // 更新父组件的值
  }
}
