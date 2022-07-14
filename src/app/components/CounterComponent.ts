import * as HUD from "../configs/Hud";
import LabelComponent from "./LabelComponent";

export default class CounterComponent extends Phaser.GameObjects.Container {
    private rectBack: Phaser.GameObjects.Rectangle;
    private label: LabelComponent;
    private counter = 0; // seconds
    private posX = this.scene.scale.gameSize.width / 2 + HUD.COUNTER_LABEL.x;
    private posY = HUD.COUNTER_LABEL.y;
    //private readonly counterText = "";
    private tweenCounter: Phaser.Tweens.Tween;

    public constructor(scene) {
        super(scene);
        this.init();
        this.updatePosition();
    }

    public updateCounterTween(): void {
        //if (!this.tweenCounter) {
        this.tweenCounter = this.scene.tweens.addCounter({
            from: this.counter,
            to: this.counter - 1,
            duration: HUD.COUNTER_LABEL.tweenTime,
            paused: false,
            repeat: 0,
            yoyo: false,
            ease: "Linear",
            onComplete: () => {
                this.counter--;
                this.label.setText(this.counter.toString());
            },
        });
        //}
        //if (this.tweenCounter.isPlaying()) this.label.setText(`${Math.floor(this.tweenCounter.getValue()).toString()}`);
    }

    // public reset(): void {
    //     this.counter = 0;
    //     this.label.setText(this.counter.toString());
    // }

    public setInitialValue(newValue: number): void {
        this.counter = newValue;
        this.label.setText(this.counter.toString());
    }

    public updatePosition(): void {
        this.posX = this.scene.scale.gameSize.width / 2 + HUD.COUNTER_LABEL.x;
        this.rectBack.setPosition(this.posX, this.posY);
        this.label.setPosition(this.posX, this.posY);
    }

    public hide(): void {
        this.label.hide();
        this.rectBack.setVisible(false);
    }

    public show(): void {
        this.label.show();
        this.rectBack.setVisible(true);
    }

    //public getValue = (): number => this.counter;

    private init(): void {
        this.initBkg();
        this.initLabel();
    }

    private initBkg(): void {
        this.rectBack = this.scene.add.rectangle(
            this.posX, // - HUD.SCORE_BACK_SIZE_X / 2,
            this.posY, // - HUD.SCORE_BACK_SIZE_Y / 2,
            HUD.COUNTER_BACK.sizeX,
            HUD.COUNTER_BACK.sizeY,
            HUD.COUNTER_BACK.cFill,
            HUD.COUNTER_BACK.aFill,
        );
        this.rectBack.setStrokeStyle(HUD.COUNTER_BACK.wStroke, HUD.COUNTER_BACK.cStroke, HUD.COUNTER_BACK.aStroke);
        this.rectBack.setOrigin(0.5, 0.5);
        this.add(this.rectBack);
    }

    private initLabel(): void {
        this.label = new LabelComponent(this.scene, this.posX, this.posY, this.counter.toString(), HUD.COUNTER_LABEL);
        this.add(this.label);
    }
}
