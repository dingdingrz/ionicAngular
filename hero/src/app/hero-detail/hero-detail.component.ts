import { Component, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';

import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { LikeVuexServiceService } from '../like-vuex-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero
  hero!: Hero 
  loginForm: FormGroup
  vuexMessage = ''
  sub!:Subscription
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
    private fb: FormBuilder,
    private likeVuexServiceService:LikeVuexServiceService
  ) { 
    this.loginForm = this.fb.group({
      account: ['4',Validators.required],
      pwd:['',Validators.required]
    }
      
    )
  }
  getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.findItem(id).subscribe(heros => {
      this.hero = heros
    })
  }
  ngOnInit(): void {
    console.log(ActivatedRoute,'ActivateRoute')
    console.log(this.route)
    this.route.params.subscribe((value)=> {
      console.log('sbu',value)
    })
    this.getHero()
    this.sub = this.likeVuexServiceService.messageReader.subscribe(res=> {
      this.vuexMessage = res
    })
  }
  ngOnDestory() {
    this.sub.unsubscribe()
  }
  handleSubTest() {
    console.log(this.loginForm,'loginForm')
  }
  handleReset() {
    this.loginForm.reset()
    this.loginForm.setValue({
      account: 22,
      pwd:''
    })
    this.loginForm.patchValue({
      pwd:46
    })

  }
  handleBack() {
    console.log(this.hero, 'detailHero')
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.location.back())

    }
    // this.location.back()
  }

}
