import { Component } from '@angular/core';
// import { IonHeader, IonToolbar, IonTitle, IonContent,IonList, } from '@ionic/angular/standalone';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeroService } from '../services/heroService';
import { IonicModule } from '@ionic/angular';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { ModelDialogComponent } from '../components/model-dialog/model-dialog.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule, ModelDialogComponent],
  // imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonList,IonicModule],

})
export class Tab1Page {
  constructor(
    private heroService:HeroService
  ) {}
  // heroList:Hero[] = []
   heroList:Hero[] = [];
   isOpenDialog:boolean = false
   currentObj:Hero | null = null
  getList() {
   this.heroList  = this.heroService.getHeroList()
  }
  ngOnInit() {
    console.log('fafds')
    this.getList()
    this.heroService.getHeroListFromDb()
  }
  handleEdit(item:Hero) {
    console.log(item)
    this.currentObj = item
    this.isOpenDialog = true
  }
  handleDelete(item:Hero) {

  }
  handleCloseDialog(value:boolean) {
    this.isOpenDialog = value
  }
  
}
