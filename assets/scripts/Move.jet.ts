// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    moveLeft:number = 0;
    moveRight:number = 0;
    moveUp:number = 0;
    moveDown:number = 0;

    @property(cc.Prefab)
    mb3:cc.Prefab = null;

    @property(cc.Prefab)
    mb1:cc.Prefab = null;

    @property(cc.Prefab)
    mb2:cc.Prefab = null;

    shootBullets(){
        var bullet = cc.instantiate(this.mb3);
        bullet.setPosition(this.node.position.x, this.node.position.y);
        this.node.parent.addChild(bullet);
    }

    moveJet(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.moveLeft = 1;
                break;
            case cc.macro.KEY.right:
                this.moveRight = 1;
                break;
            case cc.macro.KEY.up:
                this.moveUp = 1;
                break;
            case cc.macro.KEY.down:
                this.moveDown = 1;
                break;
        }
    }

    stopJet(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.moveLeft = 0;
                break;
            case cc.macro.KEY.right:
                this.moveRight = 0;
                break;
            case cc.macro.KEY.up:
                this.moveUp = 0;
                break;
            case cc.macro.KEY.down:
                this.moveDown = 0;
                break;
        }
    }

    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.moveJet, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stopJet, this);


        this.node.parent.on("touchstart", function(event){
            if(event.getLocationX() < this.node.parent.getContentSize().width / 2) {
                this.moveLeft = 1;
            }
            if(event.getLocationX() > this.node.parent.getContentSize().width / 2) {
                this.moveRight = 1;
            }
            if(event.getLocationY() > this.node.parent.getContentSize().height / 2) {
                this.moveUp = 1;
            }
            if(event.getLocationY() < this.node.parent.getContentSize().height / 2) {
                this.moveDown = 1;
            }
        }, this);

        this.node.parent.on('touchend', function(event){
            this.moveRight = 0;
            this.moveLeft = 0;
            this.moveUp = 0;
            this.moveDown = 0;
        }, this)

        // 子弹发射，间隔时间，重复次数，延迟
        this.schedule(this.shootBullets, 1, cc.macro.REPEAT_FOREVER, 0);
    }

    start () {

    }

    // 60帧表示：60秒调用60次
    update (dt) {
        if (this.moveLeft == 1) {
            this.node.setPosition(this.node.position.x -= 300*dt, this.node.position.y)
        }
        if (this.moveRight == 1) {
            this.node.setPosition(this.node.position.x += 300*dt, this.node.position.y)
        }
        if (this.moveUp == 1) {
            console.log('y', this.node.position.y);
            this.node.setPosition(this.node.position.x, this.node.position.y += 300*dt)
        }
        if (this.moveDown == 1) {
            console.log('y', this.node.position.y);
            this.node.setPosition(this.node.position.x, this.node.position.y -= 300*dt)
        }
    }
}
