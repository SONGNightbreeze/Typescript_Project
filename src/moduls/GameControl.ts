import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他的所有类
class GameControl {
    //定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;
    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);

        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        // this的问题  bind的作用
        // this.keydownHandler 返回的document，JS特性this给谁绑定就是谁
        // 因为是document就不能修改属性,   可以使用.bind(this)创建一个新的函数
        // 里面的this绑定成外层的this，里面的this就是当前对象, 整体就变成了对象，就能修改属性
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用run方法，使蛇移动    设置完方法，要调用才会生效
        this.run();
    }

    /*
    *   ArrowUp  Up
        ArrowDown Down
        ArrowLeft Left
        ArrowRight Right
    * */

    // 创建一个键盘按下的响应函数，把响应函数直接设置成类的方法    为了方便之后的维护
    keydownHandler(event: KeyboardEvent) {
        // 需要检查event.key的值是否合法（用户是否按了正确的按键） 因为有可能输入上下左右以外的按键
        // 修改direction属性
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run() {
        /*
        *   根据方向（this.direction）来使蛇的位置改变
        *       向上 top 减少
        *       向下 top 增加
        *       向左  left 减少
        *       向右  left 增加
        * */
        // 获取蛇现在坐标
        let X = this.snake.X;
        let Y = this.snake.Y;


        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }
        // 调用方法  检查是否吃到食物   
       this.checkEat(X, Y);

        //修改蛇的X和Y值   
        // 对异常进行捕获  try正常情况下， 如果异常才会catch(e)然后执行里面的内容
        // 异常的处理方式 
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (e){
            // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
            alert(e.message+' GAME OVER!');
            // 将isLive设置为false
            this.isLive = false;
        }


        // 开启一个定时调用    解决按一下调用一次
        // this.run传入到setTimeout(this.run,300)表示300毫秒调用this
        // 因为run是作为函数，this不会改变，所以也调用.bind(this),  确保this为gamecontrol的对象
        // 流程 ， 调用this.run()  run方法执行， 执行后 调用setTimeout 300毫秒再次调用 来重复 
        this.isLive && setTimeout(this.run.bind(this), 300 -(this.scorePanel.level-1)*30);
        // (this.scorePanel.level - 1)*30 等级 的 加速 300 - ... 就会变快
        // .isLive 表示是否存活， 如果失败就不会继续移动，  表示开关，游戏是否结束
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){   // 蛇的坐标和食物的坐标相同就表示吃到食物
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }


}

export default GameControl;