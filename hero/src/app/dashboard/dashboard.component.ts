import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroList:Hero[] = []
  constructor(private heroService:HeroService) { }
  getlist() {
    this.heroService.getHeroes().subscribe(list=> this.heroList = list.slice(1,5))
  }
  ngOnInit(): void {
    this.getlist()
  }

}
