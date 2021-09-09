## GameControl.ts 
#### Snake eat food
```
checkEat(X:number, Y:number){
    if(X === this.food.X && Y === this.food.Y){
        this.food.change();
        this.scorePanel.addScore();
        this.snake.addBody();
    }
}
// then call this method 
this.checkEat(X,Y);
```
## Snake.ts
#### snakeBody move 
```
moveBody(){
    for (let i=this.bodies.length-1; i>0; i--){
        //error: property 'offsetLeft' does not exist on type 'Element'
        //bodies is a HTMLCollection，type is Element，Actual type is HTMLElement，
        //so we need a Type of assertion
        let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
        let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
    
        (this.bodies[i] as HTMLElement).style.left = X +'px';
        (this.bodies[i] as HTMLElement).style.top = Y +'px';
    }
}

//Call the method to execute it inside set X(){}, and when the snake's head moves, the body moves with it
set X(value:number){
    ...
    this.moveBody();
    ...
}
set Y(value:number){
    ...
    this.moveBody();
    ...
}
```


#### snakes can't turn around
```
setX(value:number){
    ...
    if(this.bodies[1] && (this.bodies[i] as HTMLElement).offsetLeft === value){
        console.log('turn around');
        if(value > this.X){
            value = this.X -10;
        }else{
            value = this.X +10;
        }
    }
    ...
}
```

#### The snake cannot hit itself, check that the coordinates of the snake's head do not overlap with those of the body
```
checkHeadBody(){
    for (let i=1; i < this.bodies.length; i++){
        let bd = this.bodies[i] as HTMLElement;
        //if(this.X === (this.bodies[i] as HTMLElement).offsetLeft)
        if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
            throw new Error('hit yourself');
        }
    }
}
//inside set X()，after this.head.style.left = value +'px'; call the method
this.head.style.left = value +'px';
this.checkHeadBody();
```