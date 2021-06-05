// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    duration:number = 0.1;

    @property
    moveAmountX = 150;

    @property
    moveAmountY = 20;

    moveEnemy:cc.ActionInterval;

    @property(cc.Prefab)
    Bullet:cc.Prefab = null;

    @property
    ShootFrequency:number = 2.0;

    setMovements(){
        var moveLeft = cc.moveBy(this.duration, cc.v2(this.moveAmountX, -this.moveAmountY)).easing(cc.easeCircleActionInOut());
        var moveRight = cc.moveBy(this.duration, cc.v2(-this.moveAmountX, -this.moveAmountY)).easing(cc.easeCircleActionInOut());
        return cc.repeatForever(cc.sequence(moveLeft, moveRight));
    }

    spawnBullets(){
        var Bullet = cc.instantiate(this.Bullet);
        Bullet.setPosition(this.node.position.x, this.node.position.y);
        this.node.parent.addChild(Bullet);
    }

    onLoad () {
        this.moveEnemy = this.setMovements();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullets, this.ShootFrequency, cc.macro.REPEAT_FOREVER, 3.0);

        cc.director.preloadScene('Menu');
    }

    start () {

    }

    update (dt) {

        var limit = this.node.parent.getContentSize().height / 2;
        if(Math.abs(this.node.position.y) < limit){
            this.node.destroy();
            cc.director.loadScene('Menu');
        }
    }
}
