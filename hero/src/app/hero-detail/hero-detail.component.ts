import { Component, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';

import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero
  hero!: Hero 
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }
  getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.findItem(id).subscribe(heros => {
      this.hero = heros
    })
  }
  ngOnInit(): void {
    console.log(this.route)
    this.getHero()
  }
  handleBack() {
    console.log(this.hero, 'detailHero')
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.location.back())

    }
    // this.location.back()
  }

}
