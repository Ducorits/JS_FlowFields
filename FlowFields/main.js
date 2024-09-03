const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Canvas Settings
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';


class Particle {
	constructor(effect){
		this.effect = effect;
		this.x = Math.floor(Math.random() * this.effect.width);
		this.y = Math.floor(Math.random() * this.effect.height);
		this.speedX;
		this.speedY;
		this.speedModifier = Math.floor(Math.random() * 3 + 1);
		this.history = [{x: this.x, y: this.y}];
		this.maxLength = 200;
		this.angle = 0;
		this.timer = this.maxLength * 2;
	}
	draw(context){
		context.beginPath();
		context.moveTo(this.history[0].x, this.history[0].y);
		for (let i = 0; i < this.history.length; i++){
			context.lineTo(this.history[i].x, this.history[i].y);
		}
		context.stroke();
	}
	update(){
		if (this.x < this.effect.width && this.x > 0 && this.y < this.effect.height && this.y > 0){
			let x = Math.floor(this.x / this.effect.cellSize);
			let y = Math.floor(this.y / this.effect.cellSize);
			let index = y * this.effect.cols + x;
			this.angle = this.effect.flowField[index];

			this.speedX = Math.cos(this.angle);
			this.speedY = Math.sin(this.angle);
			this.x += this.speedX * this.speedModifier;
			this.y += this.speedY * this.speedModifier;

			this.history.push({x: this.x, y: this.y});
			if (this.history.length > this.maxLength){
				this.history.shift();
			}
		} else if (this.history.length > 1) {
			this.history.shift();
		} else {
			this.reset();
		}
		// if (this.x > this.effect.width || this.x < 0){
		// 	this.x = Math.floor(Math.random() * this.effect.width);
		// }
		// this.speedX = this.speedX * -1;
		// if (this.y > this.effect.height || this.y < 0)
		// 	this.y = Math.floor(Math.random() * this.effect.height);
			// this.speedY = this.speedY * -1;
		// // if (this.x > this.effect.width)
		// // 	this.x = 0;
		// // if (this.y > this.effect.height)
		// // 	this.y = 0;
		// // if (this.x < 0)
		// // 	this.x = this.effect.width;
		// // if (this.y < 0)
		// // 	this.y = this.effect.height;
	}
	reset(){
		this.x = Math.floor(Math.random() * this.effect.width);
		this.y = Math.floor(Math.random() * this.effect.height);
		this.history = [{x: this.x, y: this.y}];
		this.timer = this.maxLength * 2;
	}
}

class Effect {
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.particles = [];
		this.numberOfParticles = 500;
		this.cellSize = 10;
		this.rows;
		this.cols;
		this.flowField = [];
		this.curve = 1.2;
		this.zoom = 0.05;
		this.init();
	}
	init(){
		// create flow field
		this.rows = Math.floor(this.height / this.cellSize);
		this.cols = Math.floor(this.width / this.cellSize);
		this.flowField = [];
		for (let y = 0; y < this.rows; y++){
			for (let x = 0; x < this.cols; x++){
				let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
				this.flowField.push(angle);
			}
		}
		// console.log(this.flowField)
		// create particles
		for (let i = 0; i < this.numberOfParticles; i++)
		{
			this.particles.push(new Particle(this));
		}
	}
	render(context){
		// context.fillStyle = 'rgba(0, 0, 0, 0.025)';
		// context.fillRect(0, 0, this.width, this.height);
		// context.fillStyle = 'white';
		this.particles.forEach(particle => {
			particle.draw(context);
			particle.update();
		});
	}
}

const effect = new Effect(canvas.width, canvas.height);
console.log(effect);

function animate()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	effect.render(ctx);
	requestAnimationFrame(animate);
}
animate();