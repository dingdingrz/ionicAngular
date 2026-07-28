import { Component, OnInit } from '@angular/core';
import { LikeVuexServiceService } from '../like-vuex-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-detail-grand-detail',
  templateUrl: './detail-grand-detail.component.html',
  styleUrls: ['./detail-grand-detail.component.css']
})
// like vuex 
export class DetailGrandDetailComponent implements OnInit {
  shareMessage = ''
  sub!:Subscription
  constructor(
    private shareService:LikeVuexServiceService
  ) { 
    
  }

  ngOnInit(): void {
    this.sub = this.shareService.messageReader.subscribe(res=> {
      this.shareMessage = res
    })
  }
  handleClick() {
    this.shareService.changeMessage('被底层组件修改')
  }
  ngOnDestory() {
    this.sub.unsubscribe()
  }

}
