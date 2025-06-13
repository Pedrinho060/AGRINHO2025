let player;
let lixo = [];
let arvores = [];
let toxicos = [];
let pontos = 0;
let vidas = 3;

function setup() {
  createCanvas(600, 400);
  player = createVector(width/2, height/2);
  for (let i = 0; i < 5; i++) {
    lixo.push(createVector(random(width), random(height)));
    arvores.push(createVector(random(width), random(height)));
    toxicos.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(180, 230, 180);
  fill(0);
  textSize(16);
  text("Pontos: " + pontos, 10, 20);
  text("Vidas: " + vidas, 10, 40);
  
  // Player
  fill(0, 100, 255);
  ellipse(player.x, player.y, 30, 30);
  
  // Lixo reciclável
  fill(255, 255, 0);
  for (let i = 0; i < lixo.length; i++) {
    ellipse(lixo[i].x, lixo[i].y, 20, 20);
    if (dist(player.x, player.y, lixo[i].x, lixo[i].y) < 25) {
      pontos++;
      lixo[i] = createVector(random(width), random(height));
    }
  }

  // Árvores
  fill(0, 200, 0);
  for (let i = 0; i < arvores.length; i++) {
    rect(arvores[i].x, arvores[i].y, 20, 20);
    if (dist(player.x, player.y, arvores[i].x, arvores[i].y) < 25) {
      pontos++;
      arvores[i] = createVector(random(width), random(height));
    }
  }

  // Lixo tóxico
  fill(255, 0, 0);
  for (let i = 0; i < toxicos.length; i++) {
    triangle(toxicos[i].x, toxicos[i].y, toxicos[i].x+20, toxicos[i].y, toxicos[i].x+10, toxicos[i].y-20);
    if (dist(player.x, player.y, toxicos[i].x, toxicos[i].y) < 25) {
      vidas--;
      toxicos[i] = createVector(random(width), random(height));
      if (vidas <= 0) {
        noLoop();
        textSize(32);
        fill(255, 0, 0);
        text("Fim de Jogo", width / 2 - 80, height / 2);
      }
    }
  }

  // Movimento
  if (keyIsDown(LEFT_ARROW)) player.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) player.x += 3;
  if (keyIsDown(UP_ARROW)) player.y -= 3;
  if (keyIsDown(DOWN_ARROW)) player.y += 3;

  // Limites
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}
