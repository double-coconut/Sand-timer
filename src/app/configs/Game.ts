export const CLOCK_TIME = 15; // in seconds

export const PARTICLES_NUM = 250;
export const PARTICLE_SIZE = 5;

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
    EDITTIMER = "eventEditTimer",
    SETTIMER = "eventSetTimer",
}
