export const CLOCK_TIME = 12; // in seconds

export const PARTICLES_NUM = 350;

export enum STATE {
    FILLING, // particles are being dropped
    READY, // ready to start
    TICKING, // time goes on
    FINISHED, // timer finished
}

export enum EVENT {
    CLOCKCLICK = "eventClickOnClock",
    FILLED = "eventClockFilled",
    EMPTY = "eventClockEmpty",
    SETTIMER = "eventSetTimer",
}
