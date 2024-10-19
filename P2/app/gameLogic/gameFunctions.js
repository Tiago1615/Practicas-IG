import {
  player1,
  player2,
  ball,
  ball2,
  ball3,
  ball4,
  ball5,
  moreBalls,
  line,
  setMoreBalls,
} from './gameVars.js'

export function drawRectangle(r, gl, colorLocation) {
  var x1 = r.x;
  var x2 = r.x + r.width;
  var y1 = r.y;
  var y2 = r.y + r.height;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
  gl.uniform4fv(colorLocation, r.color);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export function animateBall(ball, gl, colorLocation){
    if (ball.showBall === true){
        updateBall(ball);
        checkBallHitPlayer(ball, player1, player2);
        drawRectangle(ball, gl, colorLocation);
    }
}

export function updateBall(ball) {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  checkBallOutOfBounds(ball, player1, player2);
}

export function checkBallOutOfBounds(ball, player1, player2) {
  if (ball.y <= -1) {
    ball.speedY *= -1;
  }

  if (ball.x + ball.width >= 1) {
    score(player1, ball);
  }

  if (ball.y + ball.height >= 1) {
    ball.speedY *= -1;
  }

  if (ball.x <= -1) {
    score(player2, ball);
  }
}

export function animatePlayer(player, gl, colorLocation){
    updatePlayer(player);
    drawRectangle(player, gl, colorLocation);
}

export function updatePlayer(player){
    player.y += player.movement; 
    checkPlayerOutOfBounds(player);
}

export function checkPlayerOutOfBounds(player){
    if (player.y + player.height > 1){
        player.y = 1 - player.height;
    } else if (player.y < -1){
        player.y = -1;
    }
}

export function checkBallHitPlayer(ball, player1, player2){
    //Rebote con el player1
    if (
        ball.x <= player1.x + player1.width &&
        ball.x + ball.width >= player1.x &&
        ball.y <= player1.y + player1.height &&
        ball.y + ball.height >= player1.y
    ){
        checkUpperOrLowerHit(player1, ball);
        
        if (ball.x <= player1.x + player1.width && ball.x > player1.x) {
          ball.x = player1.x + player1.width;
        }
        
        ball.speedX *= -1;
    }
    
    //Rebote con el player2
    if (ball.x + ball.width >= player2.x &&
        ball.x <= player2.x + player2.width &&
        ball.y <= player2.y + player2.height &&
        ball.y + ball.height >= player2.y
    ){
        checkUpperOrLowerHit(player2, ball);
        
        if (ball.x + ball.width >= player2.x && ball.x < player2.x + player2.width) {
            ball.x = player2.x - ball.width;
        }
        
        ball.speedX *= -1;
    }
}

export function checkUpperOrLowerHit(player, ball){
    //Rebote con la parte inferior del jugador
    if (ball.y <= player.y + player.height && ball.y + ball.height >= player.y + player.height) {
        ball.y = player.y + player.height;
        ball.speedY *= -1;
    }

    //Rebote con la parte superior del jugador
    if (ball.y + ball.height >= player.y && ball.y <= player.y) {
        ball.y = player.y - ball.height;
        ball.speedY *= -1;
    }
}

export function score(player, ball) {
  var scoreboar = document.getElementById("score");
  
  player.points += 1;
  ball.showBall = false;
  scoreboar.innerHTML = `<h3 id="score"> Score: ${player1.points}-${player2.points}</h3>`;
  let gameEnd = winCond(scoreboar);
  if (gameEnd === false){
    newBall(ball);
  }
}

export function newBall(ball){
  let speedX;
  let speedY;
  let rand = Math.floor((Math.random() * 10) + 1);

  if (rand % 2 === 0){
    speedX = 0.01;
    speedY = -0.02;
  }
  else{
    speedX = -0.01;
    speedY = 0.02;
  }

  ball.x = 0;
  ball.y = 0;
  ball.speedX = speedX;
  ball.speedY = speedY;
  ball.showBall = true;
}

function winCond(scoreboar){
  let noMore = false;
  if (player1.points === 10 && moreBalls === false){
    ball.showBall = false;
    ball2.showBall = false;
    ball3.showBall = false;
    ball4.showBall = false;
    ball5.showBall = false;
    scoreboar.innerHTML = `<h3 id="score">Player1 wins!`;
    noMore = true;
  }
  else if (player2.points === 10 && moreBalls === false){
    ball.showBall = false;
    ball2.showBall = false;
    ball3.showBall = false;
    ball4.showBall = false;
    ball5.showBall = false;
    scoreboar.innerHTML = `<h3 id="score">Player2 wins!`;
    noMore = true;
  }
  else if (player1.points === 20 && moreBalls === true){
    ball.showBall = false;
    ball2.showBall = false;
    ball3.showBall = false;
    ball4.showBall = false;
    ball5.showBall = false;
    scoreboar.innerHTML = `<h3 id="score">Player1 wins!`;
    noMore = true;
  }
  else if (player2.points === 20 && moreBalls === true){
    ball.showBall = false;
    ball2.showBall = false;
    ball3.showBall = false;
    ball4.showBall = false;
    ball5.showBall = false;
    scoreboar.innerHTML = `<h3 id="score">Player2 wins!`;
    noMore = true;
  }
  return noMore;
}

export function addMoreBalls(){
  if (moreBalls === false){
    ball2.showBall = true;
    ball3.showBall = true;
    ball4.showBall = true;
    ball5.showBall = true;
    setMoreBalls(true);
  }
}

export function reset(){
  ball.showBall = false;
  ball2.showBall = false;
  ball3.showBall = false;
  ball4.showBall = false;
  ball5.showBall = false;
  setMoreBalls(false);
  player1.points = 0;
  player2.points = 0;
  player1.x = -0.8;
  player1.y = -0.3;
  player2.x = 0.7;
  player2.y = -0.3;
  var scoreboar = document.getElementById("score");
  scoreboar.innerHTML = `<h3 id="score"> Score: ${player1.points}-${player2.points}</h3>`;
  newBall(ball);
}
