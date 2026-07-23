import { Component } from '@angular/core';
import { FormControl,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cus-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cus-form.html',
  styleUrl: './cus-form.css',
})
export class CusForm {
  name = new FormControl(0);
  ha = new FormControl('33');
   aa = 8888
   profile = new FormGroup({
    filed1 : new FormControl('', [Validators.required]),
    filed2 : new FormControl(''),
   })
  handleClick() {
    this.aa++;
    this.name.setValue(this.aa);
  }
  onSubmit() {
    console.log(this.profile.value);
  }
  obj = Observable.create((observer: any) => {
    setTimeout(() => {
      observer.next('first package');
    }, 1000);
    setTimeout(() => {
      observer.next('second package');
    }, 2000)
  })
  // obj.subscribe((data: any) => {
  //   console.log(data);
  // })
}
 