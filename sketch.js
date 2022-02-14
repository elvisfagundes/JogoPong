function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 90;
let alturaRaquete = 10;

//variáveis da raquete oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let trilha;
let raquetada;

function preload(){
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
  
}

function velocidadeBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaBordas(){
  
  
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, alturaRaquete, comprimentoRaquete);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  
}

function colisaoRaqueteBiblioteca(x, y){
    colidiu = collideRectCircle(x, y, alturaRaquete, comprimentoRaquete, xBolinha, yBolinha, raio)
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPontos(){
  stroke(255)
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPontos(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}


function draw() {
  background(0);
  mostraBolinha();
  mostraRaquete(xRaquete, yRaquete);
  velocidadeBolinha();
  verificaBordas();
  movimentaMinhaRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPontos();
  marcaPontos();
}