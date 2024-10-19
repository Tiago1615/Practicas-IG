export class Cube{
  constructor(colorEdges, colorCube, speed, movement){
    this.colorEdges = colorEdges;
    this.colorCube = colorCube;
    this.speed = speed;
    this.movement = movement;
  }
}

export class Enemy{
  constructor(colorEdges, colorCube, position, dead, movement){
    this.colorEdges = colorEdges;
    this.colorCube = colorCube;
    this.position = position;
    this.dead = dead;
    this.movement = movement;
  }
}
