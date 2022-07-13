//import { CounterComponent } from "../components/CounterComponent";
import * as GAME from "../configs/Game";

export class UIView extends Phaser.GameObjects.Container {
    //private counter: CounterComponent;
    private gameEvents: Phaser.Events.EventEmitter;

    public constructor(public scene, eventEmitter: Phaser.Events.EventEmitter) {
        super(scene);
        this.gameEvents = eventEmitter;
        this.init();
    }

    // public updateCounter(): void {
    //     this.counter.updateRounds();
    // }

    private init(): void {
        //this.initCounter();
        this.handleClicks();
    }

    // private initCounter(): void {
    //     this.counter = new CounterComponent(this.scene);
    //     this.counter.setPosition(300, 100);
    //     this.add(this.counter);
    // }

    // handles Clicks and Touches
    private handleClicks(): void {
        this.scene.input.on("pointerup", (pointer) => {
            if (pointer.leftButtonReleased()) this.gameEvents.emit(GAME.EVENT.START);
        });
    }
}
