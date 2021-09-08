class Snake{
    // 蛇的操作主要是div，包括蛇头和身体的操作
    // 表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体（包括蛇头）也就是snake里面的所有div 
    bodies: HTMLCollection;   // HTMLCollection是一个集合，实时的刷新,会自动补充新元素
    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!
        //  #snake > div表示取snake下的所有div，querySelector只取一个，表示只取第一个div
        // 如果出现类型不匹配，可以在后面加上 as HTMLElement表示类型断言
        this.head = document.querySelector('#snake > div') as HTMLElement;
        // 如果使用querySelectorAll获取的是里面的所有div 返回的是NodeListOf 获取的元素是固定的
        // 意味着每次添加完元素都要重新去获取， 所以要用getElementsByTagName()
        // document.getElementById('snake')!.getElementsByTagName('div');
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇的坐标（蛇头坐标）
    get X(){
        return this.head.offsetLeft;
    }

    // 获取蛇的Y轴坐标
    get Y(){
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value){

        // 如果新值和旧值相同，则直接返回不再修改    新值 和旧值相同，表示位置没有发生变化
        if(this.X === value){
            return;
        }

        // X的值的合法范围0-290之间
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙了    throw new Error(); 抛出异常，程序停止
            throw new Error('蛇撞墙了！');
        }

        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        // 判断蛇头是不是和第二节身体的坐标相同，如果相同就表示调头了
        // 第二节身体在最开始还不一定有   this.bodies[1]检查有没有第二节坐标
        // this.bodies[1] as HTMLElement).offsetLeft === value 表示等于新值
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // console.log('水平方向发生了掉头');
            // 如果发生了掉头，让蛇向反方向继续移动
            if(value > this.X){
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                // 修正一个方向
                value = this.X - 10;
            }else{
                // 向左走
                value = this.X + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.left = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }

    set Y(value){
        // 如果新值和旧值相同，则直接返回不再修改
        if(this.Y === value){
            return;
        }

        // Y的值的合法范围0-290之间
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙了，抛出一个异常
            throw new Error('蛇撞墙了！');
        }

        // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        // 移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }

    // 蛇增加身体的方法   也就是向snake的div里面新增加一对div
    addBody(){
        // 向element中添加一个div
        // insertAdjacentHTML("beforeend", "<div></div>"); 向里面添加一段html代码
        // 第一个参数是位置，beforeend 它的结束标签之前的位置
        // 第二个参数是添加什么代码
        this.element.insertAdjacentHTML("beforeend", "<div></div>");

    }

    // 添加一个蛇身体移动的方法
    moveBody(){
        /*
        *   将后边的身体设置为前边身体的位置  位置要从后往前改，先改第4节的位置。。。
        *       举例子：
        *           第4节 = 第3节的位置
        *           第3节 = 第2节的位置
        *           第2节 = 蛇头的位置
        * */
        // 遍历获取所有的身体
        for(let i=this.bodies.length-1; i>0; i--){
            // 获取前边身体的位置 所以是 [i-1]   bodies 是 HTMLclassification 实际类型是HTMLElement
            // 所以做一个类型的断言   as HTMLElement
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }

    }

    // 检查蛇头是否撞到身体的方法
    checkHeadBody(){
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1; i<this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了！');
            }
        }
    }
}

export default Snake;