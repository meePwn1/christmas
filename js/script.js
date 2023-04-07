"use strict";
window.addEventListener("load", windowLoad);

function windowLoad() {
	const tl = gsap.timeline({ duration: 1 });

	tl.from(".stairs span", {
		transform: "translate(0px, 100%)"
	}, "first");
	tl.from('.tree span', {
		transform: "translate(0px, 100%)"
	}, "-=.1")
	tl.from(".moon span", {
		transform: "translate(0px, -100%)"
	})
	tl.from(".building_one span", {
		transform: "translate(0px, 100%)"
	}, "first+=0.2")
	tl.from(".building_two span", {
		transform: "translate(0px, 100%)"
	}, "first+=0.4")
	tl.from(".building_three span", {
		transform: "translate(0px, 100%)"
	}, "first+=0.6")
	tl.from(".train span", {
		transform: "translate(100%, -100%)",
		duration: 1.5,
		opacity: 0
	})
	tl.from(".santa__tree span", {
		transform: "translate(-100vw, 0px)",
		duration: 2.5
	}, "first+=1.25")
	tl.from(".santa__ball_one span", {
		transform: "translate(-100vw, 0px)",
		duration: 2.4
	}, "first+=1.2")
	tl.from(".santa__candy_one span", {
		transform: "translate(-100vw, 0px)",
		duration: 2.3
	}, "first+=1.15")
	tl.from(".santa__ball_two span", {
		transform: "translate(-100vw, 0px)",
		duration: 2.2
	}, "first+=1.1")
	tl.from(".santa__candy_two span", {
		transform: "translate(-100vw, 0px)",
		duration: 2.1
	}, "first+=1.05")
	tl.from(".santa__man span", {
		transform: "translate(-100vw, 0px)",
		duration: 2
	}, "first+=1")


	// Mouse parallax
	const page = document.querySelector('.page');
	const parallaxItems = document.querySelectorAll('[class*="__inset"]');
	const speed = 0.05;

	let posX = 0;
	let cXprocent = 0;

	page.addEventListener('mousemove', parallaxAnimation);

	function parallaxAnimation(e) {
		const parallaxWidth = window.innerWidth;
		const cX = e.pageX - parallaxWidth / 2;
		cXprocent = cX / parallaxWidth * 100;
	}

	function setParallaxAnimationStyle(e) {
		const distX = cXprocent - posX;
		posX = posX + (distX * speed);

		parallaxItems.forEach(parallaxItem => {
			const value = parallaxItem.dataset.prxValue ?
				+parallaxItem.dataset.prxValue : 1;

			parallaxItem.style.transform = `
			translateX(${posX / value}%)`;
		});
		requestAnimationFrame(setParallaxAnimationStyle);
	}
	setParallaxAnimationStyle();

	// scrollParallax
	const moon = document.querySelector('.moon')
	const buildings = document.querySelectorAll('.building')
	const tree = document.querySelector('.tree');
	const stairs = document.querySelector('.stairs');
	const train = document.querySelector('.train');
	const santaItems = document.querySelectorAll('.santa>*');

	window.addEventListener('scroll', createPosition);
	createPosition();

	function createPosition() {
		const contentElement = document.querySelector('.content__container');
		const windowHeight = window.innerHeight;
		const finalPos = scrollY / (contentElement.offsetTop - windowHeight) * 100;
		finalPos < 100 ? christmasAnimation(finalPos) : christmasAnimation(100);
	}
	function christmasAnimation(finalPos) {
		const moonAnim = {
			translate: 50 / 100 * finalPos,
			scale: 1 + 2 / 100 * finalPos
		};
		moon.style.cssText = `
		transform:
		translate(0, ${moonAnim.translate}%)
		scale(${moonAnim.scale});
		`;
		const stairsAnim = {
			translate: 70 / 100 * finalPos,
			scale: 1 + 2 / 100 * finalPos
		};
		stairs.style.cssText = `
		transform:
		translate(0, ${stairsAnim.translate}%)
		scale(${stairsAnim.scale});
		`;
		const treeAnim = {
			translate: 70 / 100 * finalPos,
			scale: 1 + 1.5 / 100 * finalPos
		};
		tree.style.cssText = `
		transform:
		translate(0, ${treeAnim.translate}%)
		scale(${treeAnim.scale});
		`;
		buildings.forEach((building, index) => {
			const buildingAnim = {
				translate: 30 * (buildings.length - index) / 100 * finalPos,
				scale: 1 + 2 / 100 * finalPos
			};
			building.style.cssText = `
			transform:
			translate(0, ${buildingAnim.translate}%)
			scale(${buildingAnim.scale});
			`;
		})
		const trainAnim = {
			translate: 1 * finalPos,
		};
		train.style.cssText = `
			transform:
			translate(-${trainAnim.translate}%, ${trainAnim.translate}%);
		`;
		santaItems.forEach((santaItem, index) => {
			const santaAnim = {
				left: (100 + (10 * index)) / 100 * finalPos
			};
			santaItem.style.left = `${santaAnim.left}%`
		})
	}
}