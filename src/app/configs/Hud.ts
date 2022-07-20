export const COUNTER_LABEL = {
    x: 0, // shift from center
    y: 40, // shift from top
    font: "28px Georgia",
    color: "#ffffff",
    blinkDuration: 400, // ms
    blinkPause: 1200,
    maxSymbols: 5,
};

export const COUNTER_BACK = {
    sizeX: 130,
    sizeY: 38,
    cFill: 0x005500,
    aFill: 0.0,
    wStroke: 2,
    cStroke: 0x00aa00,
    aStroke: 1.0,
};

export const MESSAGE = {
    font: "28px Georgia",
    color: "#ffffff",
    cFill: 0x000077,
    aFill: 1.0,
    backHeight: 40,
};

// X sign to remove message
export const MESSAGE_X = {
    font: "28px Georgia",
    color: "#777777",
    highlightColor: "#ffffff",
    xShift: -MESSAGE.backHeight / 2,
};

export const COUNTER_INPUT_KEYS = [
    Phaser.Input.Keyboard.KeyCodes.ONE,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
    Phaser.Input.Keyboard.KeyCodes.TWO,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
    Phaser.Input.Keyboard.KeyCodes.THREE,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE,
    Phaser.Input.Keyboard.KeyCodes.FOUR,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
    Phaser.Input.Keyboard.KeyCodes.FIVE,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE,
    Phaser.Input.Keyboard.KeyCodes.SIX,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
    Phaser.Input.Keyboard.KeyCodes.SEVEN,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN,
    Phaser.Input.Keyboard.KeyCodes.EIGHT,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
    Phaser.Input.Keyboard.KeyCodes.NINE,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE,
    Phaser.Input.Keyboard.KeyCodes.ZERO,
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,
];
