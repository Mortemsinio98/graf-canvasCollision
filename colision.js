const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// fondo gradiente bonito
canvas.style.background =
"linear-gradient(180deg,#0f2027,#203a43,#2c5364,#1c2833)";

let score = 0;
const totalObjects = 15;
let objects = [];
let particles = [];

const imgObject = new Image();
imgObject.src = "https://cdn-icons-png.flaticon.com/512/5903/5903511.png";

class GameObject {

constructor(x,y,size,speed){
this.x=x;
this.y=y;
this.size=size;
this.speed=speed;
this.rotation=Math.random()*360;
}

draw(){

ctx.save();

ctx.translate(this.x,this.y);
ctx.rotate(this.rotation);

ctx.shadowColor="#00eaff";
ctx.shadowBlur=20;

ctx.drawImage(
imgObject,
-this.size/2,
-this.size/2,
this.size,
this.size
);

ctx.restore();

}

update(){

let multiplier=1;

if(score>15){

let extra=Math.floor((score-15)/5);
multiplier=2.5+(extra*0.5);

}else if(score>10){

multiplier=1.8;

}

this.y+=this.speed*multiplier;
this.rotation+=0.02;

if(this.y-this.size>canvas.height){

this.reset();

}

}

reset(){

this.y=-this.size;
this.x=Math.random()*canvas.width;
this.speed=Math.random()*3+2;

}

}

class Particle{

constructor(x,y){

this.x=x;
this.y=y;
this.size=Math.random()*4+2;
this.speedX=(Math.random()-0.5)*6;
this.speedY=(Math.random()-0.5)*6;
this.life=40;

}

update(){

this.x+=this.speedX;
this.y+=this.speedY;
this.life--;

}

draw(){

ctx.fillStyle="rgba(255,255,255,"+(this.life/40)+")";
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();

}

}

function createExplosion(x,y){

for(let i=0;i<15;i++){

particles.push(new Particle(x,y));

}

}

function init(){

objects=[];

for(let i=0;i<totalObjects;i++){

let size=50;
let x=Math.random()*canvas.width;
let y=Math.random()*(canvas.height*-1);
let speed=Math.random()*3+2;

objects.push(new GameObject(x,y,size,speed));

}

}

canvas.addEventListener("mousedown",(event)=>{

const rect=canvas.getBoundingClientRect();

const mouseX=event.clientX-rect.left;
const mouseY=event.clientY-rect.top;

objects.forEach(obj=>{

let dist=Math.hypot(mouseX-obj.x,mouseY-obj.y);

if(dist<obj.size/2){

score++;

createExplosion(obj.x,obj.y);

obj.reset();

}

});

});

function drawScore(){

ctx.textAlign="right";

ctx.font="bold 30px Arial";

if(score>15){

ctx.fillStyle="#ff4757";

}else{

ctx.fillStyle="white";

}

ctx.fillText("Score: "+score,canvas.width-30,50);

ctx.font="14px Arial";

if(score>15){

ctx.fillText("DIFICULTAD ALTA",canvas.width-30,75);

}else if(score>10){

ctx.fillText("DIFICULTAD MEDIA",canvas.width-30,75);

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

objects.forEach(obj=>{
obj.update();
obj.draw();
});

particles.forEach((p,i)=>{

p.update();
p.draw();

if(p.life<=0){

particles.splice(i,1);

}

});

drawScore();

requestAnimationFrame(animate);

}

imgObject.onload=()=>{

init();
animate();

};

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});