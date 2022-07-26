
The aim of the project was to emulate real-physics sand timer.

### Done:
 + Synced particles drop with current time period - looks like a real hourglass
 + Counter can be set in seconds up to 9999
 + Clock can be restarted
 + Pinwheel added under dropping particles just for fun

### Not done:
 - Been unable to reproduce sand particles physics
 - Been unable to stop particle jitter/wobble and prevent them from going through objects
 - Didn't made complex geometry physical body of a hourglass
 - Didn't make hourglass rotation on reset
 - Scene heavily loads desktop processor and performs very bad on mobiles

  [Canvas Liquid Effect](https://github.com/n3r4zzurr0/canvas-liquid-effect) project inspired me to try [Matter.js](https://github.com/liabru/matter-js) and make a real-physics sand timer.
Particles falling through the bottleneck are emulated by searching for lowest particles in the top part and changing its position to just under the bottleneck. This process is synchronized with the timer so that all particles drop at the exact period.
UI elements include customizable timer (only in seconds) and ribbons with the help text below hourglass.

It's hard to work with Matter.js in Phaser, especially in Typescript, since all the Matter.js examples that I've found have different syntax, classes and interfaces. So the only help that can be used is the [Phaser docs Matter section](https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.html). 

This project uses [Phaser 3 + Typescript starting template](https://github.com/arsenmazmanyan/phaser3-starting-template).
