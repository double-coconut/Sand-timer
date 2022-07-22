export const HOURGLASS = {
    width: 0.4,
    height: 0.7,
    wallsThickness: 0.05,
    cylinderPartHeight: 0.33,
    inclineLinesAngle: Math.PI * 0.24,
    bottomSpawnPoint: 25, // px below center
    bottomSpawnXJitter: 3, // random spawn point x shift
};

export const PINWHEEL = {
    on: true,
    size: 0.3, // part of HOURGLASS.width
    depth: 2.5, // part of HOURGLASS.cylinderPartHeight
    width: 0.5, // part of HOURGLASS.wallsThickness
};
