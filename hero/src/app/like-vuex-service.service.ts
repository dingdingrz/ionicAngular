import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LikeVuexServiceService {
  // 
  messageSubject = new BehaviorSubject<string>('ha')
  messageReader = this.messageSubject.asObservable()
  onlyReader() {
    return this.messageSubject.asObservable()
  }
  changeMessage(str:string) {
    this.messageSubject.next(str)
  }
  constructor() { }
}
