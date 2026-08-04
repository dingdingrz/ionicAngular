import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  // 游戏配置
  readonly GRID_SIZE = 20;       // 网格大小（20x20）
  readonly CELL_SIZE = 25;       // 每个格子的像素大小
  readonly INITIAL_SPEED = 150;  // 初始速度（毫秒）
  readonly MIN_SPEED = 60;       // 最快速度

  // 游戏状态
  snake: Position[] = [];
  food: Position = { x: 0, y: 0 };
  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';
  score = 0;
  highScore = 0;
  isGameOver = false;
  isPaused = false;
  isStarted = false;
  speed = this.INITIAL_SPEED;

  // 游戏循环
  private gameLoop: any = null;

  ngOnInit(): void {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
      this.highScore = parseInt(saved, 10);
    }
  }

  ngOnDestroy(): void {
    this.stopGameLoop();
  }

  // 键盘事件监听
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'DOWN') {
          this.nextDirection = 'UP';
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (this.direction !== 'UP') {
          this.nextDirection = 'DOWN';
        }
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (this.direction !== 'RIGHT') {
          this.nextDirection = 'LEFT';
        }
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (this.direction !== 'LEFT') {
          this.nextDirection = 'RIGHT';
        }
        event.preventDefault();
        break;
      case ' ':
        if (this.isGameOver) {
          this.restartGame();
        } else if (this.isStarted) {
          this.togglePause();
        } else {
          this.startGame();
        }
        event.preventDefault();
        break;
      case 'Enter':
        if (!this.isStarted || this.isGameOver) {
          this.startGame();
        }
        event.preventDefault();
        break;
    }
  }

  // 开始游戏
  startGame(): void {
    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    this.direction = 'RIGHT';
    this.nextDirection = 'RIGHT';
    this.score = 0;
    this.speed = this.INITIAL_SPEED;
    this.isGameOver = false;
    this.isPaused = false;
    this.isStarted = true;
    this.spawnFood();
    this.startGameLoop();
  }

  // 重新开始
  restartGame(): void {
    this.stopGameLoop();
    this.startGame();
  }

  // 暂停/继续
  togglePause(): void {
    if (this.isGameOver) return;
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopGameLoop();
    } else {
      this.startGameLoop();
    }
  }

  // 开始游戏循环
  private startGameLoop(): void {
    this.stopGameLoop();
    this.gameLoop = setInterval(() => {
      this.update();
    }, this.speed);
  }

  // 停止游戏循环
  private stopGameLoop(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }

  // 更新游戏状态
  private update(): void {
    this.direction = this.nextDirection;

    // 计算新的头部位置
    const head = { ...this.snake[0] };
    switch (this.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // 检测墙壁碰撞
    if (head.x < 0 || head.x >= this.GRID_SIZE ||
        head.y < 0 || head.y >= this.GRID_SIZE) {
      this.gameOver();
      return;
    }

    // 检测自身碰撞
    for (const segment of this.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        this.gameOver();
        return;
      }
    }

    // 将新头部添加到蛇身
    this.snake.unshift(head);

    // 检测是否吃到食物
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.spawnFood();
      // 加速
      if (this.speed > this.MIN_SPEED) {
        this.speed -= 3;
        this.startGameLoop();
      }
    } else {
      // 没吃到食物，移除尾部
      this.snake.pop();
    }
  }

  // 生成食物
  private spawnFood(): void {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.GRID_SIZE),
        y: Math.floor(Math.random() * this.GRID_SIZE)
      };
    } while (this.isPositionOnSnake(newFood));
    this.food = newFood;
  }

  // 检查位置是否在蛇身上
  private isPositionOnSnake(pos: Position): boolean {
    return this.snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  }

  // 游戏结束
  private gameOver(): void {
    this.isGameOver = true;
    this.isStarted = false;
    this.stopGameLoop();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('snakeHighScore', this.highScore.toString());
    }
  }

  // 判断某个格子是否是蛇头
  isSnakeHead(x: number, y: number): boolean {
    return this.snake.length > 0 &&
           this.snake[0].x === x && this.snake[0].y === y;
  }

  // 判断某个格子是否是蛇身
  isSnakeBody(x: number, y: number): boolean {
    return this.snake.some((segment, index) =>
      index > 0 && segment.x === x && segment.y === y
    );
  }

  // 判断某个格子是否是食物
  isFood(x: number, y: number): boolean {
    return this.food.x === x && this.food.y === y;
  }

  // 获取格子样式类
  getCellClass(x: number, y: number): string {
    if (this.isSnakeHead(x, y)) return 'cell snake-head';
    if (this.isSnakeBody(x, y)) return 'cell snake-body';
    if (this.isFood(x, y)) return 'cell food';
    return 'cell empty';
  }

  // 移动端虚拟按键控制
  onMobileControl(dir: Direction): void {
    if (this.isGameOver) {
      this.restartGame();
      return;
    }
    if (!this.isStarted) {
      this.startGame();
      return;
    }
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    };
    if (this.direction !== opposites[dir]) {
      this.nextDirection = dir;
    }
  }

  // 获取蛇头旋转角度（用于显示眼睛方向）
  getHeadRotation(): string {
    switch (this.direction) {
      case 'UP': return 'rotate(-90deg)';
      case 'DOWN': return 'rotate(90deg)';
      case 'LEFT': return 'rotate(180deg)';
      case 'RIGHT': return 'rotate(0deg)';
    }
  }
}
