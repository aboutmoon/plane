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
    BulletSpeed:number = 800

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        this.node.setPosition(this.node.x, this.node.position.y += this.BulletSpeed * dt);
        var limit = (this.node.parent.getContentSize().height + this.node.getContentSize().height) / 2;

        console.log(this.node.getPosition().y);
        if(Math.abs(this.node.getPosition().y) > limit){
            this.node.destroy();
        }
    }
}
