import { Component,Input,Output,EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cart } from '../cart';
@Component({
  standalone: true,
  selector: 'app-test',
  imports: [CommonModule,FormsModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css'],
})
export class Test {
  @Input() parentValue: string[] = [];
  @Output() parentValueChange = new EventEmitter<string[]>();
  constructor(public cart: Cart) {}
  title = '123';
  url="www.baidu.com";
  list=[1,2,3,4,5];
  num = 1
  active='active'
  current = 0
  d = new Date()
  habby: string[] = ['吃饭', '睡觉', '打豆豆'];
  onClick(e: MouseEvent) {
    console.log('点击了', e);

    this.title = '点击了' + this.num++;
  }
  chooseCurrent(i: number) {
    console.log('选择了', i);
    this.current = i;
  }
  onChange(e: Event) {
    console.log(this.habby)
    this.parentValueChange.emit(this.habby)
  }
}
