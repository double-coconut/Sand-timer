import * as HUD from "../configs/Hud";
import { EVENT } from "../configs/Game";
import LabelComponent from "./LabelComponent";

export default class CounterComponent extends Phaser.GameObjects.Container {
    private gameEvents: Phaser.Events.EventEmitter;
    private rectBack: Phaser.GameObjects.Rectangle;
    private label: LabelComponent;
    private counter = 0; // seconds
    private editState = false;
    private posX = this.scene.scale.gameSize.width / 2 + HUD.COUNTER_LABEL.x;
    private posY = HUD.COUNTER_LABEL.y;
    //private readonly counterText = "";
    private tweenCountDown: Phaser.Tweens.Tween;
    private tweenCounterBlink: Phaser.Tweens.Tween;
    private tweenCounterBlinkInterval: NodeJS.Timer;

    public constructor(scene, eventEmitter: Phaser.Events.EventEmitter) {
        super(scene);
        this.gameEvents = eventEmitter;
        this.init();
        this.updatePosition();
    }

    public updateCounter(): void {
        if (this.tweenCountDown.isPlaying()) this.label.setText(Math.floor(this.tweenCountDown.getValue()).toString());
    }

    public startCounter(): void {
        this.tweenCountDown.resume();
    }

    public setInitialValue(newValue: number): void {
        this.counter = newValue;
        this.label.setText(this.counter.toString());
        this.tweenCountDown = this.scene.tweens.addCounter({
            from: this.counter,
            to: 0,
            duration: (this.counter + 1) * 1000,
            paused: true,
            repeat: 0,
            yoyo: false,
            ease: "Linear",
            onComplete: () => {
                this.counter = 0;
                this.label.setText(this.counter.toString());
            },
        });
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

    // on click/tap after starting to edit counter
    // for mobile
    private insertCounterRandomValue(): void {
        if (this.editState && this.label.text.length === 0) {
            this.editState = false;
            this.counter = HUD.COUNTER_VALUES[Phaser.Math.Between(0, HUD.COUNTER_VALUES.length - 1)];
            this.setInitialValue(this.counter);
            this.gameEvents.emit(EVENT.SETTIMER, this.counter);
        }
    }

    private init(): void {
        this.initBkg();
        this.initLabel();
    }

    private blinkCounter(): void {
        //if (!this.tweenCounterBlink.isPlaying()) this.tweenCounterBlink.resume();
        if (!this.tweenCountDown.isPlaying()) {
            this.tweenCounterBlink.resume();
            this.tweenCounterBlinkInterval = setInterval(() => {
                this.tweenCounterBlink.resume();
            }, HUD.COUNTER_LABEL.blinkPause);
        }
    }

    private stopBlinkCounter(): void {
        clearInterval(this.tweenCounterBlinkInterval);
        this.tweenCounterBlink.pause();
        this.label.setAlpha(1.0);
    }

    private inputCounter(): void {
        if (!this.tweenCountDown.isPlaying() && this.editState) {
            this.stopBlinkCounter();
            this.label.setText("");
            this.scene.input.keyboard.on("keydown", (event) => {
                if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && this.label.text.length > 0) {
                    this.label.text = this.label.text.substr(0, this.label.text.length - 1);
                } else if (
                    HUD.COUNTER_INPUT_KEYS.includes(event.keyCode) &&
                    this.label.text.length <= HUD.COUNTER_LABEL.maxSymbols
                ) {
                    this.label.text += event.key;
                } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
                    this.editState = false;
                    const newVal = parseInt(this.label.text);
                    if (Number.isInteger(newVal)) this.counter = newVal;
                    this.setInitialValue(this.counter);
                    this.gameEvents.emit(EVENT.SETTIMER, this.counter);
                }
            });
        }
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
        this.rectBack
            .setInteractive(
                new Phaser.Geom.Rectangle(0, 0, HUD.COUNTER_BACK.sizeX, HUD.COUNTER_BACK.sizeY),
                Phaser.Geom.Rectangle.Contains,
            )
            .on("pointerover", () => this.blinkCounter())
            .on("pointerout", () => this.stopBlinkCounter())
            .on("pointerdown", () => {
                if (this.editState) this.insertCounterRandomValue();
                else {
                    this.gameEvents.emit(EVENT.EDITTIMER);
                    this.editState = true;
                    this.inputCounter();
                }
            });
        this.add(this.rectBack);
    }

    private initLabel(): void {
        this.label = new LabelComponent(this.scene, this.posX, this.posY, this.counter.toString(), HUD.COUNTER_LABEL);
        this.add(this.label);
        this.tweenCounterBlink = this.scene.tweens.add({
            targets: this.label,
            alpha: 0.3,
            duration: HUD.COUNTER_LABEL.blinkDuration,
            paused: true,
            repeat: 0,
            yoyo: true,
            ease: "Linear",
        });
    }
}
