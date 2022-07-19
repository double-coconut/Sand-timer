export const particles = {
    size: 0.01,
};

export const HOURGLASS = {
    width: 0.3,
    height: 0.7,
    wallsThickness: 0.05,
    cylinderPartHeight: 0.33,
    bottomSpawnPoint: 15, // px below center
    bottomSpawnXJitter: 4, // random spawn point x shift
};

export const PINWHEEL = {
    on: true,
    size: 0.3, // part of HOURGLASS.width
    depth: 0.9, // part of HOURGLASS.cylinderPartHeight
    width: 0.5, // part of HOURGLASS.wallsThickness
};
