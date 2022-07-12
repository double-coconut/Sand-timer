//import { IocContext } from "power-di";
//import { PopupService } from "../services/PopupService";

export class GameView extends Phaser.GameObjects.Container {
    //private popupService = IocContext.DefaultInstance.get(PopupService);
    //private bkg: Phaser.GameObjects.Sprite;

    public constructor(public scene) {
        super(scene);
        this.init();
    }

    private init(): void {
        //this.initBkg();
        this.setEnvironment();
        this.generateParticles();
    }

    private setEnvironment(): void {
        const { width, height } = this.scene.scale.gameSize;
        this.scene.matter.world.setBounds(0, 0, width, height, true, true, false, true);
    }

    private generateParticles(): void {
        //const delay = 50;
        const particlesNum = 20;
        //setTimeout({}, delay);
        for (let i = 0; i < particlesNum; i++) this.makeParticle();
    }

    private makeParticle(): void {
        const ball = this.scene.matter.add.image(
            Phaser.Math.Between(100, 700),
            Phaser.Math.Between(-600, 0),
            "bodies",
            "particleWhite.png",
        );
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
    }

    // private initBkg(): void {
    //     const { width, height } = this.scene.scale.gameSize;
    //     this.bkg = this.scene.add.sprite(width / 2, height / 2, "bkg.jpg");
    //     this.bkg.setInteractive();
    //     this.bkg.on(Phaser.Input.Events.POINTER_UP, this.handleBkgClick, this);
    //     this.add(this.bkg);
    // }

    // private handleBkgClick(): void {
    //     this.bkg.disableInteractive();
    //     this.popupService.showCounterPopup();
    //     setTimeout(() => {
    //         this.bkg.setInteractive();
    //     }, 2000);
    // }
}
