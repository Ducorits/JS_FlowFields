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
		this.speedX = 0.5;
		this.speedY = 1;
	}
	draw(context){
		context.fillRect(this.x, this.y, 20, 20);
	}
	update(){
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x > this.effect.width)
			this.x = 0;
		if (this.y > this.effect.height)
			this.y = 0;
		if (this.x < 0)
			this.x = this.effect.width;
		if (this.y < 0)
			this.y = this.effect.height;
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
	effect.render(ctx);
	requestAnimationFrame(animate);
}
animate();