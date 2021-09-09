## 3.preliminary the Snake class   Snake.ts
```
class Snake{
    head:HTMLElement;
    bodies:HTMLCollection;
    element:HTMLElement;

    constructor(){
        
        this.element = document.getElementById(elementId:'snake')!;

        this.head = document.querySelector(selector:'#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName(qualifiedName:'div');
        
        get X(){
            return this.head.offsetLeft;
        }
        get Y(){
            return this.head.offsetTop;
        }

        set X(value:number){
            this.head.style.left = value + 'px';
        }
        set Y(value:number){
            this.head.style.top = value + 'px';
        }

        //add a <div></div> to <div id="snake"> inside
        addBody(){
            this.element.insertAdjacentHTML(where:"beforeend",html:"<div></div>");
        }

    }
}
export default Snake;
```

## GameControl.ts 
### class that brings the three classes together, the game controller, controls all the other classes
### keydown event
```
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel"

class GameControl{
    snake: Snake;
    food: Food;
    scorePanel:ScorePanel;

    //Create an attribute to store the direction of the snake's movement (i.e. the direction of the keys)
    direction: string = '';


    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        //call the initialization, indicating that the object is called and the game starts directly
        this.init();
    }

    //define method
    this.init(){
        //this is document,because the event is bound to the document
        //so we need to use .bind(this)
        document.addEventListener(type:'keydown', this.keydownHandler.bind(this));
    }
    
    //创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent){
        //console.log(event.key); 
        //return string are:ArrowUp, ArrowDown, ArrowLeft, ArrowRight 
        //              IE research:Up,Down,Left,Right

        this.direction = event.key;
    }    
}

export default GameControl;
```


## index.ts 
import './style/index.less';
import GameControl from './moduls/GameControl';

const gameControl = new GameControl(); 

## GameControl 
#### snake run
```
class GameControl{
    snake: Snake;
    food: Food;
    scorePanel:ScorePanel;

    direction: string = '';
    
    // Create an attribute to record whether the game is over or not
    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }


    this.init(){
        document.addEventListener(type:'keydown', this.keydownHandler.bind(this));

        this.run(); 
    }

    keydownHandler(event: KeyboardEvent){
       this.direction = event.key;
    }
    

    //define a method for run 
    run(){
        //get the snake's current coordinates
        let X = this.snake.X;
        let Y = this.snake.Y;
    
        switch(this.direction){
            case "ArrowUp":
            case "Up":      
                Y -=10;
                break;
            case "ArrowDown":
            case "Down":
                Y +=10;
                break;
            case "ArrowLeft":
            case "Left":
                X -=10;
                break;
            case "ArrowRight":
            case "Right":
                X +=10;
                break;
        }

        //update the X and Y values of the snake
        this.snake.X = X;
        this.snake.Y = Y;

        // turn on setTimeout()
        this.isLive && setTimeout(this.run.bind(this), ms:300 - (this.scorePanel.level-1)*30);
    }

}

export default GameControl;
```


## 4.complete Snake.ts
#### Snake hitting the wall and the game over
```
class Snake{
......
        set X(value:number){
            //The direction of movement is the same as the direction of command, no change
            if(this.X === value){
                reutrn;
            }

            //if snake have hit a wall，range of X is 0-290
            if(value < 0 || value>290){
                throw new Error('蛇撞墙了') 
                //use try{} catch(){} in GameControl.ts for catching error
            }

            this.head.style.left = value + 'px';
        }
......
}
```
## GameControl.ts
```
try{
    this.snake.X =X;
    this.snake.Y =Y;
}catch(e){
    alert(e.message+'GAME OVER')
    this.isLive = false;
}
```