const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";
//para el commit
class Circle {

constructor(x, y, radius, color, text, speed){

this.posX = x;
this.posY = y;
this.radius = radius;

this.originalColor = color;
this.color = color;

this.text = text;

this.speed = speed;

this.dx = (Math.random()*2-1)*this.speed;
this.dy = (Math.random()*2-1)*this.speed;

}

draw(context){

context.beginPath();

context.strokeStyle = this.color;

context.textAlign="center";
context.textBaseline="middle";
context.font="16px Arial";

context.fillText(this.text,this.posX,this.posY);

context.lineWidth=2;

context.arc(this.posX,this.posY,this.radius,0,Math.PI*2,false);

context.stroke();

context.closePath();

}

move(){

this.posX += this.dx;
this.posY += this.dy;

if(this.posX + this.radius > window_width || this.posX - this.radius < 0){

this.dx = -this.dx;

}

if(this.posY + this.radius > window_height || this.posY - this.radius < 0){

this.dy = -this.dy;

}

}

flashBlue(){

this.color = "#0000FF";

setTimeout(()=>{
this.color = this.originalColor;
},100);

}

checkCollision(otherCircle){

let dx = this.posX - otherCircle.posX;
let dy = this.posY - otherCircle.posY;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < this.radius + otherCircle.radius){

this.flashBlue();
otherCircle.flashBlue();

/* rebote contrario */

let tempDx = this.dx;
let tempDy = this.dy;

this.dx = otherCircle.dx;
this.dy = otherCircle.dy;

otherCircle.dx = tempDx;
otherCircle.dy = tempDy;

}

}

update(context){

this.move();
this.draw(context);

}

}

let circles=[];

function generateCircles(n){

for(let i=0;i<n;i++){

let radius = Math.random()*30+20;

let x = Math.random()*(window_width-radius*2)+radius;
let y = Math.random()*(window_height-radius*2)+radius;

let color=`#${Math.floor(Math.random()*16777215).toString(16)}`;

let speed = Math.random()*4+1;

let text=`C${i+1}`;

circles.push(new Circle(x,y,radius,color,text,speed));

}

}

function detectCollisions(){

for(let i=0;i<circles.length;i++){

for(let j=i+1;j<circles.length;j++){

circles[i].checkCollision(circles[j]);

}

}

}

function animate(){

ctx.clearRect(0,0,window_width,window_height);

detectCollisions();

circles.forEach(circle=>{

circle.update(ctx);

});

requestAnimationFrame(animate);

}

generateCircles(20);

animate();