import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Hero, SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  heroList: Hero[] = [];
  pageNum = 1;
  pageSize = 20;
  formData: Hero = { name: '', power: 0, skill: '' };
  isEdit = false;
  editId = 0;

  constructor(
    private sqliteService: SqliteService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.sqliteService.initDB();
    await this.loadHeroList();
  }

  async loadHeroList() {
    this.heroList = await this.sqliteService.getHeroList(this.pageNum, this.pageSize);
  }

  async submitSave(form: NgForm) {
    if (!this.formData.name) {
      return this.showToast('英雄名称不能为空');
    }
    if (this.isEdit) {
      this.formData.id = this.editId;
      await this.sqliteService.updateHero(this.formData);
      await this.showToast('编辑成功');
    } else {
      await this.sqliteService.addHero(this.formData);
      await this.showToast('新增成功');
    }
    this.resetForm();
    await this.loadHeroList();
    form.resetForm();
  }

  async editItem(hero: Hero) {
    this.isEdit = true;
    this.editId = hero.id!;
    this.formData = { ...hero };
  }

  async deleteItem(id: number) {
    await this.sqliteService.deleteHero(id);
    await this.loadHeroList();
    await this.showToast('删除成功');
  }

  async addTestData() {
    await this.sqliteService.batchInsertTestHero();
    await this.loadHeroList();
    await this.showToast('测试数据已导入');
  }

  resetForm() {
    this.formData = { name: '', power: 0, skill: '' };
    this.isEdit = false;
    this.editId = 0;
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }
}
