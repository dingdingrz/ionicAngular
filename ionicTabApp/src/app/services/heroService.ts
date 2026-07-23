import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  db!: SQLiteObject
  DB_NAME = 'heroDB.db'
  TABLE_NAME = 'hero'
  async init() {
    try {
      console.log('afdfadf')
      this.db = await this.sqlite.create({
        name: this.DB_NAME,
        location: 'default'
      })
      const createTable = `CREATE TABLE IF NOT EXISITS hero(
      id INTERGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`
      await this.db.executeSql(createTable, [])
      console.log('数据库初始完成')
      this.batchInserTestHero()
    } catch (err) {
      console.log(err, '数据库初始化失败')
    }

  }
  constructor(private sqlite: SQLite) { }
  async addHero(hero: Hero): Promise<number> {
    const sql = `INSERT INTO ${this.TABLE_NAME}(id,name) VALUES(?,?)`
    const res = await this.db.executeSql(sql, [hero.id, hero.name])
    return res.insertId
  }
  async batchInserTestHero(): Promise<void> {
    await this.db.transaction(async tx => {
      const heroes: Hero[] = [
        { id: 11, name: 'Dr Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
      ]
      const sql = `INSERT INTO ${this.TABLE_NAME}(id,name) VALUES (?,?)`
      for(const item of heroes) {
         await tx.executeSql(sql,[item.id,item.name])
      }
     
    })
  }
  async getHeroListFromDb(page=1,size=10): Promise<Hero[]> {
    const offset = (page -1 ) * size
    const sql = `SELECT * FROM ${this.TABLE_NAME} ORDER BY id DESC LIMIT ?,?`
    const res = await this.db.executeSql(sql,[offset,size])
    const list:Hero[] = []
    for(let i=0;i< res.rows.length; i++) {
      list.push(res.rows.item(i))
    }
    return list
  }
  getHeroList() {
    const herolist = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return herolist
  }

}
