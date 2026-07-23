import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { catchError,map,tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  herosBaseUrl  = 'api/heroes'
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(
    private messageService:MessageService,
    private http:HttpClient,
  
  ) { }
  // getHeroes():Observable<Hero[]> {
  //   const heros = of(HEROES)
  //   this.messageService.add('hahfahfdah')
  //   return heros;
  // }
  getHeroes():Observable<Hero[]> {
  
    return this.http.get<Hero[]>(this.herosBaseUrl)
    .pipe(
      tap(_ => this.log('fetch heros')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )
  }
  findItem(id: Number): Observable<Hero>{
    const current = HEROES.find(item => item.id === id)!
     this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(current)
  }
  log(message:string) {
    this.messageService.add(`HerosService${message}`)
  }
  getHeroById(id:number):Observable<Hero> {
    const url =  `${this.herosBaseUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log( `fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }
  handleError<T>(operation="operation",result?: T ) {
    return (error:HttpErrorResponse):Observable<T> => {
      console.log(error)
      this.log(`${operation} failed ${error.message}`)
      return of(result as T)
    }
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.herosBaseUrl,hero,this.httpOptions).pipe(
      tap(_=> this.log(`update id ${hero.id}`))
    )
  }
  addHero(hero:Hero):Observable<Hero> {
    return this.http.post<Hero>(this.herosBaseUrl,hero,this.httpOptions).pipe(
      tap((newHero:Hero)=> this.log('add hero')),
      catchError(this.handleError<Hero>('addHero'))
    )
  }
  deleteHero(id:number):Observable<Hero>{
    const url = `${this.herosBaseUrl}/${id}`
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_=> this.log(`deleteItem id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

}
