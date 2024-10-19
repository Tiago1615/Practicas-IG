import {Player} from './Classes/playerClass.js';
import {Ball} from './Classes/ballClass.js';

//Jugadores
export var player1 = new Player(-0.8, -0.3, 0.1, 0.4, [0, 0, 1, 1], 0, 0);
export var player2 = new Player(0.7, -0.3, 0.1, 0.4, [1, 0, 0, 1], 0, 0);

//Pelotas
export var ball = new Ball(0, 0, 0.1, 0.1, [1, 1, 1, 1], 0.01, -0.02, true);
export var ball2 = new Ball(0, 0.3, 0.1, 0.1, [1, 0, 0, 1], 0.01, -0.02, false);
export var ball3 = new Ball(0, 0.6, 0.1, 0.1, [0, 0, 1, 1], -0.01, 0.02, false);
export var ball4 = new Ball(0, -0.3, 0.1, 0.1, [0, 1, 0, 1], 0.01, -0.02, false);
export var ball5 = new Ball(0, -0.6, 0.1, 0.1, [1, 1, 0, 1], -0.01, 0.02, false);


export var moreBalls = false; //Flag para el modo de más pelotas
export var line = new Player(0, -1, 0.03, 2, [0.4, 0.32, 0.72, 1], 0, 0); //Línea central

//Setter para poder modificar la variable en gameFunctions.js
export function setMoreBalls(value){
  moreBalls = value;
}
