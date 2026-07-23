import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, capSQLiteSet } from '@capacitor-community/sqlite';

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
  private sqlite: SQLiteConnection;
  private db: any;
  private readonly DB_NAME = 'heroDB.db';
  private readonly TABLE_NAME = 'hero';

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB(): Promise<void> {
    try {
      if (Capacitor.getPlatform() === 'web') {
        await this.sqlite.initWebStore();
      }
      this.db = await this.sqlite.createConnection(this.DB_NAME, false, 'no-encryption', 1, false);
      await this.db.open();
      const createTableSql = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        power INTEGER,
        skill TEXT
      )`;
      await this.db.execute(createTableSql, []);
    } catch (error) {
      console.error('SQLite 初始化失败', error);
      throw error;
    }
  }

  async addHero(hero: Hero): Promise<number> {
    const sql = `INSERT INTO ${this.TABLE_NAME} (name, power, skill) VALUES (?, ?, ?)`;
    const res = await this.db.run(sql, [hero.name, hero.power, hero.skill]);
    return res.changes?.lastId || 0;
  }

  async getHeroList(page = 1, size = 20): Promise<Hero[]> {
    const offset = (page - 1) * size;
    const res = await this.db.query(`SELECT * FROM ${this.TABLE_NAME} ORDER BY id DESC LIMIT ? OFFSET ?`, [size, offset]);
    return res.values as Hero[];
  }

  async updateHero(hero: Hero): Promise<void> {
    const sql = `UPDATE ${this.TABLE_NAME} SET name=?, power=?, skill=? WHERE id=?`;
    await this.db.run(sql, [hero.name, hero.power, hero.skill, hero.id]);
  }

  async deleteHero(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id=?`;
    await this.db.run(sql, [id]);
  }

  async batchInsertTestHero(): Promise<void> {
    const heroes: Hero[] = [
      { name: '钢铁侠', power: 95, skill: '马克战甲' },
      { name: '雷神', power: 98, skill: '雷神之锤' },
      { name: '美国队长', power: 88, skill: '振金盾牌' }
    ];
    await this.db.run(
      `BEGIN TRANSACTION; ${heroes.map(() => `INSERT INTO ${this.TABLE_NAME}(name, power, skill) VALUES (?, ?, ?);`).join(' ')} COMMIT;`,
      heroes.reduce((acc, hero) => acc.concat([hero.name, hero.power, hero.skill]), [] as any[])
    );
  }
}
