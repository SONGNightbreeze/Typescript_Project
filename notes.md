## 1. Use webpack to build projects
#### package.json、tsconfig.json、webpack.config.js

> install dependencies -> npm i -> node_modules

> create src folder - index.html - index.ts

> npm run build -> dist 

> i will use less for this project -> npm i -D less less-loader css-loader style-loader
> install postcss Plugins -> npm i -D postcss postcss-loader postcss-preset-env
#### webpack.config.js      Set up for less
```
    {
        test: /\.less$/,
        // Specify which applications, are executed from the bottom up
            use:[
                "style-loader",
                "css-loader",
                //"less-loader"

                // import postcss, similar to babel for js
                // allows new versions of css syntax to be browser compatible
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions:{
                            plugins:[
                                [
                                    "postcss-preset-env",
                                    {
                                        browsers: 'last 2 versions'
                                    }
                                ]
                            ]
                        }
                    }
                },
                "less-loader"
            ]
    }
```
> Project build complete -> npm run build      

> npm start 

-------------------------------------------------------------------------
## 2.Build interface
#### index.html 
> Create the main container for the game <div id="main"></div>
#### index.less 
```
@bg-color: #b7d4a8;
// Clear default style
*{
    margin:0;
    padding:0;
    //Change the calculation of the box model
    box-sizing:border-box;
}

#main{
    width:360px;
    height:420px;
    background-color:@bg-color;

    margin:100px auto;

    border: 10px solid black;
    border-radius:40px

    #stage{
        width:304px;
        height:304px;
        border:2px solid black;
    }
}
```

#### index.html 
```
//Setting the stage for the game
<div id="main">
    <div id="stage">
    </div>
</div>
```
```
// setting score-panel
<div id="score-panel"> 
    <div>
        SCORE:<div id="score">0</div>
    </div>
    <div>
        level:<div id="level">1</div>
    </div>
</div>
```

#### index.less 
```
body{
    font:bold 20px "Courier";
}
#main{

    display:flex;
    flex-flow:column;
    // cross axis
    align-items:center;
    // main axis
    justify-content: space-around;

        #score-panel{  
            width:304px;
            display:flex;
            //Set the alignment of the axis, as SCORE and level are to be placed on both sides
            justify-content:space-between;
        }
}
```
#### index.html
```
<div id="snake">
    //The div inside the snake represents the bodies of the snake
    <div> </div>
</div>
```
#### index.less
```
#stage{
    position:relative;

    #snake{
        &>div{
            width:10px;
            height:10px;
            background-color:#000;
            // hope there are gaps in each square of the snake's body
            border:1px solid @bg-color; 
                                        
            position:absolute;
        }
    }
}
```
#### index.html 
```
<div id="food">
    //Add 4 divs to set the style of the food
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```
#### index.less
```
#stage{
    #food{
        width:10px;
        height:10px;
        position:absolute;

        left:40px;
        top:100px;

        //open an flex box for food
        //make an arrangement of the 4 small divs inside of food
        display:flex;
        flex-flow:row wrap; 
        justify-content:space-between; 
        align-content:space-between;
        
        &>div{
            width:4px;
            height:4px;
            background-color:black;
            transform:rotate(45deg);
        }
    }
}
```


#### Food class  create file Food.ts  
#### class include attribute and method
```
class Food{
    //Define an attribute to indicate the element to which the food corresponds
    element: HTMLElement;
    constructor(){
        this.element = document.getElementById(elementId:'food')!; 
        // !  means that the element cannot be empty
    }
    
    //Define method
    get X(){
        return this.element.offsetLeft;
    }
    get Y(){
        return this.element.offsetTop;
    }

    //change the position of food
    change(){
        // range of top and left is 0-290,because food is 10px
        // so the value is 0,10,20,30....290
        //Math.random() * 290  
        //Math.round(x:Math.random*29); 
        //Math.round(x:Math.random*29)*10; Multiply by 10,take the whole number of 10

        let top = Math.round(x:Math.random*29)*10;
        let left = Math.round(x:Math.random*29)*10;
        this.element.style.left = left +'px';
        this.element.style.top = top +'px';
    }
}
```

#### ScorePanel class 
```
class ScorePanel{
    score = 0;
    level = 1;
    // when you make changes to the score and level, is change the <span> 

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // Set variables
    maxLevel: number;
    upScore: number;

    constructor(maxLevel:number = 10, upScore:number = 10){  
                // number=10 means the default value, if no parameter is entered, the value is 10
        this.scoreEle = document.getElementById(elementId:'score')!;
        this.levelEle = document.getElementById(elementId:'level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //define method
    addScore(){
        //this.score++;
        //this.scoreEle.innerHTML = this.score + ''; the value need to be string
        this.scoreEle.innerHTML = ++this.score + '';
        
        //when the score is 10, one level up 
        //if(this.score % 10 === 0){
        if(this.score % this.upScore ===0 ){
            this.levelUp();
        }
    }

    levelUp(){
        //if(this.level<maxLevel){
        if(this.level < this.maxLevel){
            this.levelUp.innerHTML = ++this.level + '';
        }
    }
}

//test code
const scorePanel = new ScorePanel(maxLevel:100, upScore:2);
for(let i=0; i<200; i++){
    scorePanel.addScore();
}
```

## Modularity - Place each class in a module
#### create folder moduls - Food.ts, ScorePanel.ts
#### export default Food;   export default ScorePanel;

#### src folder - index.tx import moduls

#### index.ts
```
import './style/index.less';
import Food from './moduls/Food';
```