import '../lib/flickity.js';

export function flkty() {
	let options = {
		freeScroll: true,
		wrapAround: true,
		autoPlay: true,
		pageDots: true,
		prevNextButtons: true,
	};

	let elem = document.querySelector('.carousel');
	let flkty = new Flickity(elem, options);

	return flkty;
};