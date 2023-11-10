window.onload = function () {
	document.body.classList.add('loaded_hiding');
	

	window.setTimeout(function () {
		document.body.classList.remove('loaded_hiding');
		document.body.classList.add('loaded');
	}, 500);
};


const navs = document.querySelectorAll('.nav');
navs.forEach(nav => {
	nav.addEventListener('click', () => {
		if (!nav.classList.contains('select')) {
			navs.forEach(e => {
				e.classList.remove('select')
			})
			nav.classList.add('select')


			const id = nav.id;
			const contentBlocks = document.querySelectorAll('.content');
			contentBlocks.forEach(block => {
				if (block.classList.contains(id)) {
					block.classList.add('open');
					window.scrollTo(0, 0);
				} else {
					block.classList.remove('open');
				}
			})

		}
	})
})



let quotes = [
	[
		"Что разум человека может постигнуть и во что он может поверить, того он способен достичь"
	],

	[
		"Стремитесь не к успеху, а к ценностям, которые он дает"
	],

	[
		"Если вы хотите успеха, а готовитесь к поражению, то вы получите как раз то, к чему готовитесь."
	],

	[
		"Надо любить жизнь больше, чем смысл жизни."
	],

	[
		"Жизнь - это то, что с тобой происходит, пока ты строишь планы."
	],

	[
		"Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно."
	],

	[
		"Начинать всегда стоит с того, что сеет сомнения."
	],

	[
		"80% успеха - это появиться в нужном месте в нужное время."
	],
];



let quote = quotes[Math.floor(Math.random() * quotes.length)];
let phrase = document.querySelector("#phrase");
phrase.innerHTML = quote;


window.requestAnimFrame = function () {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	);
}();

let resizeReset = function () {
	w = canvasBody.width = window.innerWidth;
	h = canvasBody.height = window.innerHeight;
}

const opts = {
	particleColor: "rgb(200,200,200)",
	lineColor: "rgb(200,200,200)",
	particleAmount: 30,
	defaultSpeed: 1,
	variantSpeed: 1,
	defaultRadius: 2,
	variantRadius: 2,
	linkRadius: 200,
};

window.addEventListener("resize", function () {
	deBouncer();
});

let deBouncer = function () {
	clearTimeout(tid);
	tid = setTimeout(function () {
		resizeReset();
	}, delay);
};

let checkDistance = function (x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function (point1, hubs) {
	for (let i = 0; i < hubs.length; i++) {
		let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
		let opacity = 1 - distance / opts.linkRadius;
		if (opacity > 0) {
			drawArea.lineWidth = 0.5;
			drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
			drawArea.beginPath();
			drawArea.moveTo(point1.x, point1.y);
			drawArea.lineTo(hubs[i].x, hubs[i].y);
			drawArea.closePath();
			drawArea.stroke();
		}
	}
}

Particle = function (xPos, yPos) {
	this.x = Math.random() * w;
	this.y = Math.random() * h;
	this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
	this.directionAngle = Math.floor(Math.random() * 360);
	this.color = opts.particleColor;
	this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
	this.vector = {
		x: Math.cos(this.directionAngle) * this.speed,
		y: Math.sin(this.directionAngle) * this.speed
	};
	this.update = function () {
		this.border();
		this.x += this.vector.x;
		this.y += this.vector.y;
	};
	this.border = function () {
		if (this.x >= w || this.x <= 0) {
			this.vector.x *= -1;
		}
		if (this.y >= h || this.y <= 0) {
			this.vector.y *= -1;
		}
		if (this.x > w) this.x = w;
		if (this.y > h) this.y = h;
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;
	};
	this.draw = function () {
		drawArea.beginPath();
		drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		drawArea.closePath();
		drawArea.fillStyle = this.color;
		drawArea.fill();
	};
};

function setup() {
	particles = [];
	resizeReset();
	for (let i = 0; i < opts.particleAmount; i++) {
		particles.push(new Particle());
	}
	window.requestAnimationFrame(loop);
}

function loop() {
	window.requestAnimationFrame(loop);
	drawArea.clearRect(0, 0, w, h);
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
	}
	for (let i = 0; i < particles.length; i++) {
		linkPoints(particles[i], particles);
	}
}

const canvasBody = document.getElementById("canvas"),
	drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
	rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();

const btnUp = {
	el: document.querySelector('.btn-up'),
	show() {
	  // удалим у кнопки класс btn-up_hide
	  this.el.classList.remove('btn-up_hide');
	},
	hide() {
	  // добавим к кнопке класс btn-up_hide
	  this.el.classList.add('btn-up_hide');
	},
	addEventListener() {
	  // при прокрутке содержимого страницы
	  window.addEventListener('scroll', () => {
		// определяем величину прокрутки
		const scrollY = window.scrollY || document.documentElement.scrollTop;
		// если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
		scrollY > 400 ? this.show() : this.hide();
	  });
	  // при нажатии на кнопку .btn-up
	  document.querySelector('.btn-up').onclick = () => {
		// переместим в начало страницы
		window.scrollTo({
		  top: 0,
		  left: 0,
		  behavior: 'smooth'
		});
	  }
	}
  }
  
  btnUp.addEventListener();
