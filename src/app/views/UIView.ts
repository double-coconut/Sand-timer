import CounterComponent from "../components/CounterComponent";
//import * as HUD from "../configs/Hud";

export class UIView extends Phaser.GameObjects.Container {
    private counter: CounterComponent;
    private gameEvents: Phaser.Events.EventEmitter;

    public constructor(public scene, eventEmitter: Phaser.Events.EventEmitter) {
        super(scene);
        this.gameEvents = eventEmitter;
        this.init();
    }

    public setCounter(value: number): void {
        this.counter.setInitialValue(value);
    }

    public updateCounter(): void {
        this.counter.updateCounter();
    }

    public startCounter(): void {
        this.counter.startCounter();
    }

    private init(): void {
        this.initCounter();
        //this.handleClicks();
    }

    private initCounter(): void {
        this.counter = new CounterComponent(this.scene, this.gameEvents);
        this.add(this.counter);
    }

    // handles Clicks and Touches
    // private handleClicks(): void {
    //     this.scene.input.on("pointerup", (pointer) => {
    //         if (pointer.leftButtonReleased()) this.gameEvents.emit(GAME.EVENT.CLICK);
    //     });
    // }
}
