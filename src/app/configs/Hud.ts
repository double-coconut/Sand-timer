export const COUNTER_LABEL = {
    x: 0, // shift from center
    y: 80, // shift from top
    font: "36px Courier",
    color: "#ffffff",
    blinkDuration: 400, // ms
    blinkPause: 1200,
    maxSymbols: 3,
};

export const COUNTER_BACK = {
    sizeX: 130,
    sizeY: 42,
    cFill: 0x005500,
    aFill: 0.0,
    wStroke: 2,
    cStroke: 0x00aa00,
    aStroke: 1.0,
};

export const MESSAGE = {
    font: "28px Arial",
    color: "#ffffff",
    cFill: 0x007700,
    aFill: 1.0,
    backHeight: 130,
    align: "center",
};

// X sign to remove message
export const MESSAGE_X = {
    font: "32px Arial",
    color: "#999999",
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

export const COUNTER_VALUES = [15, 30, 60, 120, 600, 1200];

export const MESSAGE_TEXT_START =
    "Click/tap hourglass to start.\nClick again after finish to reset.\nClick counter to set time.";

export const MESSAGE_TEXT_EDIT_COUNTER =
    "Use keyboard number keys\nto set time period in seconds.\n<Backspace> to delete, <Enter> to set.\nOr just click/tap again for a preset value.";
