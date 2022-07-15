//import { IocContext } from "power-di";
import * as Stats from "stats.js";
import { SceneNames } from "../enums/Scenes";
import * as GAME from "../configs/Game";
//import { PopupService } from "../services/PopupService";
//import { ForegroundView } from "../views/ForegroundView";
import { GameView } from "../views/GameView";
import { UIView } from "../views/UIView";

export default class MainScene extends Phaser.Scene {
    private gameView: GameView;
    private uiView: UIView;

    private gameEvents: Phaser.Events.EventEmitter;
    private state = GAME.STATE.FILLING;
    private clockTimer: number = GAME.CLOCK_TIME;

    public constructor() {
        super({ key: SceneNames.Main });
    }

    public update(): void {
        if (this.state === GAME.STATE.TICKING) this.uiView.updateCounter();
    }

    private init(): void {
        this.gameEvents = new Phaser.Events.EventEmitter();
        //this.initServices();
        this.initGameView();
        this.initUIView();
        //this.initForegroundView();
        this.handleEvents();

        if (process.env.NODE_ENV !== "production") {
            this.initStatJS();
        }
    }

    private initGameView(): void {
        this.gameView = new GameView(this, this.gameEvents);
        this.add.existing(this.gameView);
    }

    private initUIView(): void {
        this.uiView = new UIView(this, this.gameEvents);
        this.add.existing(this.uiView);
        this.uiView.setCounter(this.clockTimer);
    }

    private handleEvents(): void {
        this.gameEvents.on(GAME.EVENT.CLOCKCLICK, () => {
            if (this.state === GAME.STATE.READY) {
                this.state = GAME.STATE.TICKING;
                this.uiView.startCounter();
                this.startClock();
            } else if (this.state === GAME.STATE.FINISHED) {
                this.gameView.rotateHourglass();
                this.uiView.setCounter(this.clockTimer);
            }
        });
        this.gameEvents.on(GAME.EVENT.FILLED, () => {
            this.state = GAME.STATE.READY;
        });
        this.gameEvents.on(GAME.EVENT.EMPTY, () => {
            this.state = GAME.STATE.FINISHED;
        });
        this.gameEvents.on(GAME.EVENT.SETTIMER, (value) => {
            this.clockTimer = value;
        });
    }

    private startClock(): void {
        const dropDelay = (this.clockTimer * 1000) / GAME.PARTICLES_NUM;
        const startTime = Date.now();
        const timer = setInterval(() => {
            this.gameView.dropParticle();
            if (Date.now() > startTime + this.clockTimer * 1000) clearInterval(timer);
        }, dropDelay);
    }

    // private initForegroundView(): void {
    //     this.foregroundView = new ForegroundView(this);
    //     this.add.existing(this.foregroundView);
    //
    //     this.popupService.view = this.foregroundView;
    // }

    // private initServices(): void {
    //     this.popupService = IocContext.DefaultInstance.get(PopupService);
    //     this.popupService.initialize();
    // }

    private initStatJS(): void {
        const stats = new Stats();
        stats.showPanel(0);
        const update = (): void => {
            stats.begin();
            stats.end();
            requestAnimationFrame(update);
        };
        update();
        document.body.appendChild(stats.dom);
    }
}
