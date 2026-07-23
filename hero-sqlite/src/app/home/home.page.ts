import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Hero, SqliteService } from '../services/sqlite';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  heroList: Hero[] = [];
  pageNum = 1;
  pageSize = 10;
  // 新增/编辑表单
  formData: Hero = { name: '', power: 0, skill: '' };
  isEdit = false;
  editId = 0;

  constructor(
    private sqliteSer: SqliteService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.sqliteSer.initDB();
    await this.loadHeroList();
  }

  // 加载列表
  async loadHeroList() {
    this.heroList = await this.sqliteSer.getHeroList(this.pageNum, this.pageSize);
  }

  // 填充编辑表单
  async editItem(item: Hero) {
    this.isEdit = true;
    this.editId = item.id!;
    this.formData = { ...item };
  }

  // 提交保存
  async submitSave() {
    if (!this.formData.name) {
      const toast = await this.toastCtrl.create({ message: '英雄名称不能为空', duration: 1500 });
      toast.present();
      return;
    }
    if (this.isEdit) {
      this.formData.id = this.editId;
      await this.sqliteSer.updateHero(this.formData);
    } else {
      await this.sqliteSer.addHero(this.formData);
    }
    await this.resetForm();
    await this.loadHeroList();
    const toast = await this.toastCtrl.create({ message: this.isEdit ? '修改成功' : '新增成功', duration: 1500 });
    toast.present();
  }

  // 删除
  async delItem(id: number) {
    await this.sqliteSer.deleteHero(id);
    await this.loadHeroList();
    const toast = await this.toastCtrl.create({ message: '删除成功', duration: 1500 });
    toast.present();
  }

  // 重置表单
  resetForm() {
    this.formData = { name: '', power: 0, skill: '' };
    this.isEdit = false;
    this.editId = 0;
  }

  // 批量导入测试数据
  async addTestData() {
    await this.sqliteSer.batchInsertTestHero();
    await this.loadHeroList();
    const toast = await this.toastCtrl.create({ message: '批量插入测试英雄完成', duration: 1500 });
    toast.present();
  }
}