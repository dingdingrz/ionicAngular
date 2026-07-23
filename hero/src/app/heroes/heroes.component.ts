import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero:Hero = {
    id: 1,
    name: 'Windstorm'
  };
  heroList:Hero[] = [];
  hoveredIndex: number | null = null;
  isAdd:Boolean=false
  chooseItem: Hero | null = null;
  constructor(
    private heroService: HeroService,
    private messageService:MessageService,
    private location: Location
  ) { }
  onSelect(item: Hero): void {
    this.chooseItem = item;
    this.messageService.add(`selectHerorId id  ${item.id}`)

  }
  getList() {
     this.heroService.getHeroes().subscribe(heroesdd=> {
      console.log(heroesdd,'adfadf')
      this.heroList = heroesdd
     }
      )
  }
  handleAdd(name:string) {
    console.log(name,'afasfs')
    if(!name) return 
    this.heroService.addHero({name} as Hero)
    .subscribe(hero=> this.heroList.push(hero))
    // this.location.back()
    this.isAdd = false
    // this.heroService.addHero()
  }
  addHeros() {
    this.isAdd = true
  }
  deleteItem(item: Hero,e:Event) {
    e.stopPropagation()
    if(item.id) {
       this.heroService.deleteHero(item.id).subscribe()
       this.chooseItem = null
       this.getList()
    }
   
  }
  ngOnInit(): void {
    this.getList()
  }

}
