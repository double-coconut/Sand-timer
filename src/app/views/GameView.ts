//import { IocContext } from "power-di";
//import { PopupService } from "../services/PopupService";
import * as GAME from "../configs/Game";

export class GameView extends Phaser.GameObjects.Container {
    //private popupService = IocContext.DefaultInstance.get(PopupService);
    //private bkg: Phaser.GameObjects.Sprite;
    private readonly particlesConfig = {
        size: 0.01,
    };
    private particlesTop: Phaser.Physics.Matter.Image[] = [];
    private particlesBottom: any[] = [];

    private readonly hourglassConfig = {
        width: 0.3,
        height: 0.7,
        wallsThickness: 0.05,
        cylinderPartHeight: 0.33,
    };
    private activeWidth: number;
    private activeHeight: number;
    private hgWidth: number;
    private hgWallsThickness: number;

    public constructor(public scene) {
        super(scene);
        this.init();
        this.dropParticle();
    }

    public dropParticle(): void {
        if (this.particlesTop.length > 0) {
            let lowestParticleIndex = -1;
            let lowestParticleY = 0;
            this.particlesTop.forEach((particle, index) => {
                if (particle.y > lowestParticleY) {
                    lowestParticleY = particle.y;
                    lowestParticleIndex = index;
                }
            });
            if (lowestParticleIndex >= 0) {
                const particle = this.particlesTop.splice(lowestParticleIndex, 1);
                this.particlesBottom.push(particle[0]);
                particle[0].setPosition(particle[0].x, particle[0].y + 25);
            }
        }
        console.log(this.particlesTop.length);
    }

    private init(): void {
        //this.initBkg();
        this.setEnvironment();
        this.makeHourglass();
        this.generateParticles();
    }

    private setEnvironment(): void {
        this.activeWidth = this.scene.scale.gameSize.width;
        this.activeHeight = this.scene.scale.gameSize.height;
        this.hgWidth = this.activeWidth * this.hourglassConfig.width;
        this.hgWallsThickness = this.hgWidth * this.hourglassConfig.wallsThickness;
        this.scene.matter.world.setBounds(0, 0, this.activeWidth, this.activeHeight, 50, true, true, false, true);
    }

    private makeHourglass(): void {
        const hourglassWallsConfig = {
            isStatic: true,
            render: {
                fillStyle: "white",
                strokeStyle: "black",
                lineWidth: 2,
            },
        };
        const hgHeight = this.activeHeight * this.hourglassConfig.height;
        const hgCylPartHeight = hgHeight * this.hourglassConfig.cylinderPartHeight;

        const leftTopVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth - this.hgWidth) / 2,
            (this.activeHeight - hgHeight + hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const rightTopVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth + this.hgWidth) / 2,
            (this.activeHeight - hgHeight + hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const topHor = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            this.activeHeight / 2,
            Math.sqrt(
                this.hgWidth * this.hgWidth + (hgHeight * (1 - 2 * this.hourglassConfig.cylinderPartHeight)) ** 2,
            ),
            this.hgWallsThickness,
            hourglassWallsConfig,
        );
        this.scene.matter.body.setAngle(topHor, Math.PI * 0.175);

        const leftBottomVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth - this.hgWidth) / 2,
            (this.activeHeight + hgHeight - hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const rightBottomVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth + this.hgWidth) / 2,
            (this.activeHeight + hgHeight - hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const bottomHor = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            this.activeHeight / 2,
            Math.sqrt(
                this.hgWidth * this.hgWidth + (hgHeight * (1 - 2 * this.hourglassConfig.cylinderPartHeight)) ** 2,
            ),
            this.hgWallsThickness,
            hourglassWallsConfig,
        );
        this.scene.matter.body.setAngle(bottomHor, -Math.PI * 0.175);

        const hourGlass = this.scene.matter.body.create({
            parts: [leftTopVert, rightTopVert, topHor, leftBottomVert, rightBottomVert, bottomHor],
            friction: 1.0,
            frictionAir: 1.0,
        });
        const pieceOfWall = this.scene.matter.add.image(
            (this.activeWidth - this.hgWidth) / 2,
            (this.activeHeight - hgHeight) / 2,
            "bodies",
            "particleWhite.png",
        );
        pieceOfWall.setExistingBody(hourGlass).setStatic(true);
        //console.log(hourGlass);
    }

    private generateParticles(): void {
        //const delay = 50;
        //setTimeout({}, delay);
        for (let i = 0; i < GAME.PARTICLES_NUM; i++) this.makeParticle();
    }

    private makeParticle(): void {
        // const particleImage = new Phaser.GameObjects.Image(this.scene, -100, -100, "bodies", "particleWhite.png");
        // particleImage.setSize(this.activeWidth * this.particles.size, this.activeWidth * this.particles.size);

        const ball = this.scene.matter.add.image(
            Phaser.Math.Between(
                (this.activeWidth - this.hgWidth) / 2 + this.hgWallsThickness * 2,
                (this.activeWidth + this.hgWidth) / 2 - this.hgWallsThickness * 2,
            ),
            Phaser.Math.Between(-300, 0),
            "bodies",
            "particleWhite.png",
        );
        ball.setCircle();
        ball.setFriction(1.0).setFrictionAir(0.05);
        ball.setBounce(0.01);
        //this.scene.matter.body.scale(ball, this.particlesConfig.size, this.particlesConfig.size);
        this.particlesTop.push(ball);
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
