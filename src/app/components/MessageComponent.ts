import * as HUD from "../configs/Hud";
import LabelComponent from "./LabelComponent";

export default class MessageComponent extends Phaser.GameObjects.Container {
    private back: Phaser.GameObjects.Rectangle;
    private label: LabelComponent;
    private xLabel: LabelComponent;
    private destroyed = false;

    public constructor(scene: Phaser.Scene, text: string) {
        super(scene);
        this.init(text);
        this.updatePosition();
    }

    public updatePosition(): void {
        if (!this.destroyed) {
            const x = this.scene.scale.gameSize.width / 2;
            const y = this.scene.scale.gameSize.height - HUD.MESSAGE.backHeight / 2;
            this.back.setPosition(x, y);
            this.label.setPosition(x, y);
            this.xLabel.setPosition(this.scene.scale.gameSize.width + HUD.MESSAGE_X.xShift, y);
        }
    }

    public close(): void {
        if (!this.destroyed) {
            this.label.destroy();
            this.xLabel.destroy();
            this.back.destroy();
            this.destroyed = true;
        }
    }

    public show(): void {
        if (!this.destroyed) {
            this.updatePosition();
            this.label.show();
            this.xLabel.show();
            this.back.setVisible(true);
            this.back
                .setInteractive(
                    new Phaser.Geom.Rectangle(0, 0, this.scene.scale.gameSize.width, HUD.MESSAGE.backHeight),
                    Phaser.Geom.Rectangle.Contains,
                )
                .on("pointerover", () => this.lightX())
                .on("pointerout", () => this.grayoutX())
                .on("pointerdown", () => this.close());
        }
    }

    private lightX(): void {
        this.xLabel.setColor(HUD.MESSAGE_X.highlightColor);
    }

    private grayoutX(): void {
        this.xLabel.setColor(HUD.MESSAGE_X.color);
    }

    private init(text: string): void {
        this.initBack();
        this.initLabel(text);
    }

    private initBack(): void {
        this.back = this.scene.add.rectangle(
            0,
            0,
            this.scene.scale.gameSize.width,
            HUD.MESSAGE.backHeight,
            HUD.MESSAGE.cFill,
            HUD.MESSAGE.aFill,
        );
        //this.back.setStrokeStyle(HUD.COUNTER_BACK.wStroke, HUD.COUNTER_BACK.cStroke, HUD.COUNTER_BACK.aStroke);
        this.back.setVisible(false).setOrigin(0.5, 0.5);
        this.add(this.back);

        this.xLabel = new LabelComponent(this.scene, 0, 0, "X", HUD.MESSAGE_X);
        this.xLabel.hide();
        this.add(this.xLabel);
    }

    private initLabel(text): void {
        this.label = new LabelComponent(this.scene, 0, 0, text, HUD.MESSAGE);
        this.label.hide();
        this.add(this.label);
    }
}
