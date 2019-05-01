import ScrollMagic from 'scrollmagic';
import { logoPopTimeline } from '../gsap/index.js';
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');

export function clickScrollAction (controller) {
	controller.scrollTo((newpos) => {
		TweenMax.to(window, 1, { scrollTo: { y: newpos }, ease: Power1.easeInOut });
	}); // change behaviour of controller to animate scroll instead of jump

	// for Jump links
	$(document).on('click', 'a.smoothScroll[href^="#"]', (e) => {
		e.preventDefault();
		let id = $(e.currentTarget).attr('href'); // scroll to the start of the nth ID
		controller.scrollTo(id); // trigger scroll
	});
};

export function indexHeroScene (controller) {
	let indexHeroScene = new ScrollMagic.Scene({
		triggerElement: '#hero_image_play > .grid',
		triggerHook: 0,
		offset: -75,
		// duration: 60,
	})
	// .setTween(logoPopTimeline)
	.setClassToggle("body", "shrink")
	.addTo(controller);
	return indexHeroScene;
};

export function projectHeroScene (controller) {
	let indexHeroScene = new ScrollMagic.Scene({
		triggerElement: '#project_w > .grid',
		triggerHook: 0,
		offset: -75,
	})
	// .setTween(indexHeroTimeline)
	.setClassToggle("body", "shrink")
	.addTo(controller);
	return indexHeroScene;
};