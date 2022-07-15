export const CLOCK_TIME = 18; // in seconds

export const PARTICLES_NUM = 250;

export enum STATE {
    FILLING, // particles are being dropped
    READY, // ready to start
    TICKING, // time goes on
    FINISHED, // timer finished
}

export enum EVENT {
    CLICK = "eventClick",
    FILLED = "eventClockFilled",
    EMPTY = "eventClockEmpty",
}
