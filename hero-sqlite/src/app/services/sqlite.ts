import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

export interface Hero {
  id?: number;
  name: string;
  power: number;
  skill: string;
}

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance!: SQLiteObject;
  private readonly DB_NAME = 'heroDB.db';
  private readonly TABLE_NAME = 'hero';

  constructor(private sqlite: SQLite) {}

  // 初始化数据库+建表
  async initDB(): Promise<void> {
    try {
      this.dbInstance = await this.sqlite.create({
        name: this.DB_NAME,
        location: 'default' // 安卓持久化存储目录
      });
      // 创建英雄表
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME}(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          power INTEGER,
          skill TEXT
        )
      `;
      await this.dbInstance.executeSql(createTableSql, []);
      console.log('数据库初始化完成');
    } catch (err) {
      console.error('数据库初始化失败', err);
      throw err;
    }
  }

  // 新增英雄
  async addHero(hero: Hero): Promise<number> {
    const sql = `INSERT INTO ${this.TABLE_NAME}(name, power, skill) VALUES (?, ?, ?)`;
    const res = await this.dbInstance.executeSql(sql, [hero.name, hero.power, hero.skill]);
    return res.insertId;
  }

  // 查询全部英雄（分页）
  async getHeroList(page = 1, size = 10): Promise<Hero[]> {
    const offset = (page - 1) * size;
    const sql = `SELECT * FROM ${this.TABLE_NAME} ORDER BY id DESC LIMIT ?, ?`;
    const res = await this.dbInstance.executeSql(sql, [offset, size]);
    const list: Hero[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      list.push(res.rows.item(i));
    }
    return list;
  }

  // 根据ID查询单个英雄
  async getHeroById(id: number): Promise<Hero | null> {
    const sql = `SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`;
    const res = await this.dbInstance.executeSql(sql, [id]);
    if (res.rows.length > 0) return res.rows.item(0);
    return null;
  }

  // 更新英雄
  async updateHero(hero: Hero): Promise<void> {
    const sql = `UPDATE ${this.TABLE_NAME} SET name=?, power=?, skill=? WHERE id=?`;
    await this.dbInstance.executeSql(sql, [hero.name, hero.power, hero.skill, hero.id]);
  }

  // 删除英雄
  async deleteHero(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.dbInstance.executeSql(sql, [id]);
  }

  // 批量插入测试数据（事务）
  async batchInsertTestHero(): Promise<void> {
    await this.dbInstance.transaction(async (tx: any) => {
      const heroes: Hero[] = [
        { name: '钢铁侠', power: 95, skill: '马克战甲' },
        { name: '雷神', power: 98, skill: '雷神之锤' },
        { name: '美国队长', power: 88, skill: '振金盾牌' }
      ];
      const sql = `INSERT INTO ${this.TABLE_NAME}(name, power, skill) VALUES (?, ?, ?)`;
      for (const h of heroes) {
        await tx.executeSql(sql, [h.name, h.power, h.skill]);
      }
    });
  }
}