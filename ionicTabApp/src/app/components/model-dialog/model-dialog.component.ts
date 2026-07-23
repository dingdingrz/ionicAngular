import { Component, EventEmitter, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Input,Output } from '@angular/core';
import { Hero } from 'src/app/hero';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss'],
  imports:[IonicModule,FormsModule]
})
export class ModelDialogComponent  implements OnInit {
  @Input() isOpenDialog:boolean = false
  @Output() closeDialog = new EventEmitter<boolean>()
  @Input() editObj:Hero | null = null
  constructor() { }
  handleCloseDialog() {
    
    this.closeDialog.emit(false)
  }
  handleConfirm() {
    
  }
  ngOnInit() {}

}
