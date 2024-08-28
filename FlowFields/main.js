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
		this.speedX = Math.random() * 5 - 2.5;
		this.speedY = Math.random() * 5 - 2.5;
		this.history = [{x: this.x, y: this.y}];
	}
	draw(context){
		context.fillRect(this.x, this.y, 5, 5);
		context.beginPath();
		context.moveTo(this.history[0].x, this.history[0].y);
		for (let i = 0; i < this.history.length && i < 3; i++){
			context.lineTo(this.history[i].x, this.history[i].y);
		}
		context.stroke();
	}
	update(){
		this.x += this.speedX + Math.random() * 3 - 1.5;
		this.y += this.speedY;
		this.history.push({x: this.x, y: this.y});
		if (this.x > this.effect.width || this.x < 0)
			this.speedX = this.speedX * -1;
		if (this.y > this.effect.height || this.y < 0)
			this.speedY = this.speedY * -1;
		// if (this.x > this.effect.width)
		// 	this.x = 0;
		// if (this.y > this.effect.height)
		// 	this.y = 0;
		// if (this.x < 0)
		// 	this.x = this.effect.width;
		// if (this.y < 0)
		// 	this.y = this.effect.height;
	}
}

class Effect {
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.particles = [];
		this.numberOfParticles = 80;
		this.init();
	}
	init(){
		// create particles
		for (let i = 0; i < this.numberOfParticles; i++)
		{
			this.particles.push(new Particle(this));
		}
	}
	render(context){
		context.fillStyle = 'rgba(0, 0, 0, 0.025)';
		context.fillRect(0, 0, this.width, this.height);
		context.fillStyle = 'white';
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
	// ctx.clearRect(0, 0, canvas.width, canvas.height)
	effect.render(ctx);
	requestAnimationFrame(animate);
}
animate();