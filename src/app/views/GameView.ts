//import { IocContext } from "power-di";
//import { PopupService } from "../services/PopupService";
import * as GAME from "../configs/Game";
import * as VISUALS from "../configs/Visuals";

export class GameView extends Phaser.GameObjects.Container {
    private gameEvents: Phaser.Events.EventEmitter;
    private readonly delayToSettle = 100;

    private activeWidth: number;
    private activeHeight: number;

    private particlesTop: Phaser.Physics.Matter.Image[] = [];
    private particlesBottom: any[] = [];

    private hourGlass: any;
    private hgWidth: number;
    private hgHeight: number;
    private hgWallsThickness: number;

    public constructor(public scene, eventEmitter: Phaser.Events.EventEmitter) {
        super(scene);
        this.gameEvents = eventEmitter;
        this.init();
    }

    public rotateHourglass(): void {
        if (this.particlesTop.length === 0) {
            //this.scene.matter.body.rotate(this.hourGlass, Math.PI);
            // this.scene.matter.body.applyForce(
            //     this.hourGlass,
            //     {
            //         x: this.activeWidth / 2,
            //         y: this.activeHeight - this.hgHeight,
            //     },
            //     { x: 1.0, y: 0 },
            // );
            this.particlesBottom.forEach((particle) =>
                particle.setPosition(particle.x, particle.y - this.hgHeight * 0.9),
            );
            setTimeout(() => this.gameEvents.emit(GAME.EVENT.FILLED), this.delayToSettle);
            while (this.particlesBottom.length > 0) this.particlesTop.push(this.particlesBottom.pop());
        }
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
                particle[0].setPosition(
                    Phaser.Math.Between(
                        this.activeWidth / 2 - VISUALS.hourglass.bottomSpawnXJitter,
                        this.activeWidth / 2 + VISUALS.hourglass.bottomSpawnXJitter,
                    ),
                    this.activeHeight / 2 + VISUALS.hourglass.bottomSpawnPoint,
                );
            }
            if (this.particlesTop.length === 0) this.gameEvents.emit(GAME.EVENT.EMPTY);
        }
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
        this.hgWidth = this.activeWidth * VISUALS.hourglass.width;
        this.hgHeight = this.activeHeight * VISUALS.hourglass.height;
        this.hgWallsThickness = this.hgWidth * VISUALS.hourglass.wallsThickness;

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
        const hgCylPartHeight = this.hgHeight * VISUALS.hourglass.cylinderPartHeight;

        const topLid = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            (this.activeHeight - this.hgHeight) / 2,
            this.hgWidth,
            this.hgWallsThickness,
            hourglassWallsConfig,
        );
        // const topVertices =
        //     "((this.activeWidth - this.hgWidth) / 2) " +
        //     "(this.activeHeight - this.hgHeight - this.hgWallsThickness) / 2 " +
        //     "((this.activeWidth + this.hgWidth) / 2) " +
        //     "(this.activeHeight - this.hgHeight - this.hgWallsThickness) / 2 " +
        //     "((this.activeWidth + this.hgWidth) / 2) " +
        //     "(this.activeHeight - this.hgHeight + this.hgWallsThickness) / 2 " +
        //     "((this.activeWidth - this.hgWidth) / 2) " +
        //     "(this.activeHeight - this.hgHeight + this.hgWallsThickness) / 2 ";
        // const Top = this.scene.add.polygon(
        //     this.activeWidth / 2,
        //     (this.activeHeight - this.hgHeight) / 2,
        //     topVertices,
        //     0x0000ff,
        //     0.2,
        // );
        // this.scene.matter.add.gameObject(Top, { shape: { type: "fromVerts", verts: topVertices, flagInternal: true } });
        const leftTopVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth - this.hgWidth) / 2,
            (this.activeHeight - this.hgHeight + hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const rightTopVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth + this.hgWidth) / 2,
            (this.activeHeight - this.hgHeight + hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const LRIncline = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            this.activeHeight / 2,
            Math.sqrt(
                this.hgWidth * this.hgWidth + (this.hgHeight * (1 - 2 * VISUALS.hourglass.cylinderPartHeight)) ** 2,
            ),
            this.hgWallsThickness,
            hourglassWallsConfig,
        );
        this.scene.matter.body.setAngle(LRIncline, Math.PI * 0.175);

        const leftBottomVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth - this.hgWidth) / 2,
            (this.activeHeight + this.hgHeight - hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const rightBottomVert = this.scene.matter.bodies.rectangle(
            (this.activeWidth + this.hgWidth) / 2,
            (this.activeHeight + this.hgHeight - hgCylPartHeight) / 2,
            this.hgWallsThickness,
            hgCylPartHeight,
            hourglassWallsConfig,
        );
        const RLIncline = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            this.activeHeight / 2,
            Math.sqrt(
                this.hgWidth * this.hgWidth + (this.hgHeight * (1 - 2 * VISUALS.hourglass.cylinderPartHeight)) ** 2,
            ),
            this.hgWallsThickness,
            hourglassWallsConfig,
        );
        this.scene.matter.body.setAngle(RLIncline, -Math.PI * 0.175);
        const bottomLid = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            (this.activeHeight + this.hgHeight) / 2,
            this.hgWidth,
            this.hgWallsThickness,
            hourglassWallsConfig,
        );

        this.hourGlass = this.scene.matter.body.create({
            parts: [
                topLid,
                leftTopVert,
                rightTopVert,
                LRIncline,
                leftBottomVert,
                rightBottomVert,
                RLIncline,
                bottomLid,
            ],
            friction: 1.0,
            frictionAir: 1.0,
        });
        const pieceOfWall = this.scene.matter.add.image(
            (this.activeWidth - this.hgWidth) / 2,
            (this.activeHeight - this.hgHeight) / 2,
            "bodies",
            "particleWhite.png",
        );
        pieceOfWall.setExistingBody(this.hourGlass).setStatic(true);
        this.scene.matter.constraint.create({
            bodyA: this.hourGlass,
            pointB: { x: this.activeWidth / 2, y: this.activeHeight / 2 },
            length: 0,
            stiffness: 0.8,
        });
        const hgClickArea = this.scene.add.rectangle(
            this.activeWidth / 2,
            this.activeHeight / 2,
            this.hgWidth, // + 2 * VISUALS.hourglass.wallsThickness * this.activeWidth,
            this.hgHeight, // + 2 * VISUALS.hourglass.wallsThickness * this.activeWidth,
            0x000000,
            0.0,
        );
        hgClickArea
            .setInteractive(
                new Phaser.Geom.Rectangle(0, 0, this.hgWidth, this.hgHeight),
                Phaser.Geom.Rectangle.Contains,
            )
            //.on("pointerover", () => change color?)
            //.on("pointerout", () => change color back)
            .on("pointerdown", () => this.gameEvents.emit(GAME.EVENT.CLOCKCLICK));
    }

    private generateParticles(): void {
        for (let i = 0; i < GAME.PARTICLES_NUM; i++) this.createParticle();
        setTimeout(() => this.gameEvents.emit(GAME.EVENT.FILLED), this.delayToSettle);
    }

    private createParticle(): void {
        // const particleImage = new Phaser.GameObjects.Image(this.scene, -100, -100, "bodies", "particleWhite.png");
        // particleImage.setSize(this.activeWidth * this.particles.size, this.activeWidth * this.particles.size);

        const ball = this.scene.matter.add.image(
            Phaser.Math.Between(
                (this.activeWidth - this.hgWidth) / 2 + this.hgWallsThickness * 2,
                (this.activeWidth + this.hgWidth) / 2 - this.hgWallsThickness * 2,
            ),
            Phaser.Math.Between(
                (this.activeHeight - this.hgHeight) / 2 + this.hgWallsThickness * 2,
                (this.activeHeight - this.hgHeight) / 2 + VISUALS.hourglass.cylinderPartHeight * this.hgHeight,
            ),
            "bodies",
            "particleWhite.png",
        );
        ball.setCircle();
        ball.setFriction(1.0).setFrictionAir(0.05);
        ball.setBounce(0.01);
        //this.scene.matter.body.scale(ball, this.particlesConfig.size, this.particlesConfig.size);
        this.particlesTop.push(ball);
    }
}
