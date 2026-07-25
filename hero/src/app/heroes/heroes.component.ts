import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { trigger, state, style, animate,transition } from '@angular/animations';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations: [
    trigger('openClose', [
      // state('open', style({
      //   'color': 'blue',
      //   'opacity': 1,
      //    transform: 'scale(10)',
      //   'background-color': '#505050'
      // })),
      // state('close', style({
      //   'opacity': 0.5,
      //   'background-color': 'blue'
      // })),
      //    transition('open => closed', 
      //   animate('100ms ease-in-out')
      // ),
      //    transition('closed => open', [
      //   animate('20s')
      // ]),
        // 状态1：true 显示状态样式
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      // 状态2：false 隐藏状态样式
      state('close', style({
        opacity: 0.8,
        transform: 'scale(0.8)'
      })),
      // 正向过渡：false => true 入场动画 300ms
      transition('close => open', animate('300ms ease-out')),
      // 反向过渡：true => false 退场动画 200ms
      transition('open => close', animate('200ms ease-in'))
    ])
  ]
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  heroList: Hero[] = [];
  hoveredIndex: number | null = null;
  isAdd: Boolean = false
  chooseItem: Hero | null = null;
  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    private location: Location,
    // private tokenInterceptor:TokenInterceptor
  ) { }
  onSelect(item: Hero): void {
    this.chooseItem = item;
    this.messageService.add(`selectHerorId id  ${item.id}`)

  }
  getList() {
    this.heroService.getHeroes().subscribe(heroesdd => {
      console.log(heroesdd, 'adfadf')
      this.heroList = heroesdd
    }
    )
  }
  handleAdd(name: string) {
    console.log(name, 'afasfs')
    if (!name) return
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroList.push(hero))
    // this.location.back()
    this.isAdd = false
    // this.heroService.addHero()
  }
  addHeros() {
    this.isAdd = true
  }
  deleteItem(item: Hero, e: Event) {
    e.stopPropagation()
    if (item.id) {
      this.heroService.deleteHero(item.id).subscribe()
      this.chooseItem = null
      this.getList()
    }

  }
  ngOnInit(): void {
    this.getList()
  }

}
