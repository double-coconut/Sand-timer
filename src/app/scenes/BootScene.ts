import { SceneNames } from "../enums/Scenes";

export default class BootScene extends Phaser.Scene {
    public constructor() {
        super({ key: SceneNames.Boot });
    }

    private init(): void {
        this.scene.start(SceneNames.Main);
    }
}
