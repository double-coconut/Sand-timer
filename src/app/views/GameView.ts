//import { IocContext } from "power-di";
//import { PopupService } from "../services/PopupService";
import * as GAME from "../configs/Game";
import * as VISUALS from "../configs/Visuals";

export class GameView extends Phaser.GameObjects.Container {
    private gameEvents: Phaser.Events.EventEmitter;
    private readonly delayToSettle = 100;

    private activeWidth: number;
    private activeHeight: number;

    private particlesTop: any[] = [];
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
                //particle.setPosition(particle.x, particle.y - this.hgHeight * 0.9),
                this.scene.matter.alignBody(
                    particle,
                    particle.position.x,
                    particle.position.y - this.hgHeight * 0.8,
                    Phaser.Display.Align.BOTTOM_CENTER,
                ),
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
                if (particle.position.y > lowestParticleY) {
                    lowestParticleY = particle.position.y;
                    lowestParticleIndex = index;
                }
            });
            if (lowestParticleIndex >= 0) {
                const particle = this.particlesTop.splice(lowestParticleIndex, 1)[0];
                this.particlesBottom.push(particle);
                // if the particles are images/tiles
                // particle[0].setPosition(
                //     Phaser.Math.Between(
                //         this.activeWidth / 2 - VISUALS.HOURGLASS.bottomSpawnXJitter,
                //         this.activeWidth / 2 + VISUALS.HOURGLASS.bottomSpawnXJitter,
                //     ),
                //     this.activeHeight / 2 + VISUALS.HOURGLASS.bottomSpawnPoint,
                // );
                this.scene.matter.alignBody(
                    particle,
                    Phaser.Math.Between(
                        this.activeWidth / 2 - VISUALS.HOURGLASS.bottomSpawnXJitter,
                        this.activeWidth / 2 + VISUALS.HOURGLASS.bottomSpawnXJitter,
                    ),
                    this.activeHeight / 2 + VISUALS.HOURGLASS.bottomSpawnPoint,
                    Phaser.Display.Align.BOTTOM_CENTER,
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
        this.hgWidth = this.activeWidth * VISUALS.HOURGLASS.width;
        this.hgHeight = this.activeHeight * VISUALS.HOURGLASS.height;
        this.hgWallsThickness = this.hgWidth * VISUALS.HOURGLASS.wallsThickness;

        this.scene.matter.world.setBounds(0, 0, this.activeWidth, this.activeHeight, 50, false, false, false, false);
    }

    private makeHourglass(): void {
        const hourglassWallsConfig = {
            isStatic: true,
            // render: {
            //     fillStyle: "white",
            //     strokeStyle: "black",
            //     lineWidth: 2,
            // },
        };
        const hgCylPartHeight = this.hgHeight * VISUALS.HOURGLASS.cylinderPartHeight;

        const topLid = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            (this.activeHeight - this.hgHeight) / 2,
            this.hgWidth,
            this.hgWallsThickness,
            hourglassWallsConfig,
        );
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
                this.hgWidth * this.hgWidth + (this.hgHeight * (1 - 2 * VISUALS.HOURGLASS.cylinderPartHeight)) ** 2,
            ),
            this.hgWallsThickness,
            { isStatic: true, angle: Math.PI * 0.26 },
        );

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
                this.hgWidth * this.hgWidth + (this.hgHeight * (1 - 2 * VISUALS.HOURGLASS.cylinderPartHeight)) ** 2,
            ),
            this.hgWallsThickness,
            { isStatic: true, angle: -Math.PI * 0.26 },
        );
        const bottomLid = this.scene.matter.bodies.rectangle(
            this.activeWidth / 2,
            (this.activeHeight + this.hgHeight) / 2,
            this.hgWidth,
            this.hgWallsThickness,
            hourglassWallsConfig,
        );

        if (VISUALS.PINWHEEL.on) {
            const pinwheel = this.scene.matter.bodies.rectangle(
                this.activeWidth / 2,
                (this.activeHeight - this.hgHeight) / 2 +
                    VISUALS.HOURGLASS.cylinderPartHeight * VISUALS.PINWHEEL.depth * this.hgHeight,
                this.hgWidth * VISUALS.PINWHEEL.size,
                this.hgWallsThickness * VISUALS.PINWHEEL.width,
                { friction: 0, restitution: 1, mass: 0.05 }, //, angle: (90 * Math.PI) / 180
            );
            const pieceOfPinwheel = this.scene.matter.add.image(
                this.activeWidth / 2,
                (this.activeHeight - this.hgHeight) / 2 +
                    VISUALS.HOURGLASS.cylinderPartHeight * VISUALS.PINWHEEL.depth * this.hgHeight,
                "bodies",
                "particleWhite.png",
            );
            pieceOfPinwheel.setExistingBody(pinwheel);

            this.scene.matter.add.worldConstraint(pinwheel, 0, 0.9, {
                pointA: {
                    x: this.activeWidth / 2,
                    y:
                        (this.activeHeight - this.hgHeight) / 2 +
                        VISUALS.HOURGLASS.cylinderPartHeight * VISUALS.PINWHEEL.depth * this.hgHeight,
                },
            });
        }

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
        pieceOfWall.setExistingBody(this.hourGlass);
        this.scene.matter.add.worldConstraint(this.hourGlass, 0, 0.9, {
            pointA: { x: this.activeWidth / 2, y: this.activeHeight / 2 },
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

        // const ball = this.scene.matter.add.image(
        //     Phaser.Math.Between(
        //         (this.activeWidth - this.hgWidth) / 2 + this.hgWallsThickness * 2,
        //         (this.activeWidth + this.hgWidth) / 2 - this.hgWallsThickness * 2,
        //     ),
        //     Phaser.Math.Between(
        //         (this.activeHeight - this.hgHeight) / 2 + this.hgWallsThickness * 2,
        //         (this.activeHeight - this.hgHeight) / 2 + VISUALS.HOURGLASS.cylinderPartHeight * this.hgHeight,
        //     ),
        //     "bodies",
        //     "particleWhite.png",
        // );
        const ball = this.scene.matter.add.circle(
            Phaser.Math.Between(
                (this.activeWidth - this.hgWidth) / 2 + this.hgWallsThickness * 2,
                (this.activeWidth + this.hgWidth) / 2 - this.hgWallsThickness * 2,
            ),
            Phaser.Math.Between(
                (this.activeHeight - this.hgHeight) / 2 + this.hgWallsThickness * 2,
                (this.activeHeight - this.hgHeight) / 2 + VISUALS.HOURGLASS.cylinderPartHeight * this.hgHeight,
            ),
            3.5,
            { restitution: 0.9, friction: 0.3 },
        );
        //this.scene.matter.body.scale(ball, this.particlesConfig.size, this.particlesConfig.size);
        this.particlesTop.push(ball);
    }
}
