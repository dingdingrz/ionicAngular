import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-svg-pratice',
  templateUrl: './svg-pratice.component.html',
  styleUrls: ['./svg-pratice.component.css']
})
export class SvgPraticeComponent implements OnInit {

  constructor() {

  }
  drawContainer() {
    const draw = SVG().addTo('#drawing').size(600, 300)
    const element = draw.element('title').words('this is title')
    // 2. 制作模板：symbol 内部绘制房子图标
    // const houseTemplate = draw.symbol()
    //   .viewbox(0, 0, 100, 100) // 给模板设置独立视口（图标标准写法）
    // // 房子墙体正方形
    // houseTemplate.rect(80, 80).move(10, 20).fill('#917272').stroke({ width: 2 })
    // // 房顶三角形
    // houseTemplate.polygon('0,20 100,20 50,0').fill('#e74c3c')

    // // 👉 此时页面空空如也，symbol不会显示

    // // 3. use() 调取模板，生成多个房子实例
    // // 第一栋房子：坐标(20,20)
    // draw.use(houseTemplate).move(20, 20).size(80, 80)
    // // 第二栋房子：往右摆放，尺寸放大一点
    // draw.use(houseTemplate).move(150, 20).size(100, 100)
    // // 第三栋房子：换填充颜色
    // draw.use(houseTemplate).move(300, 20).fill('#3498db')
  }

  ngOnInit(): void {
    this.drawContainer()
  }

}
