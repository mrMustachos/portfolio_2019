import { TimelineMax } from "gsap/all";
// require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');

export function logoPopTimeline() {
	let logoPop = new TimelineMax();
	logoPop
		.to($('#hero_image_play .hero__logo img'), 0.3, { scale: 0, autoAlpha: 0, transformOrign: '50% 50%', ease: Power1.easeInOut })
		.to($('#nav .logo'), 0.3, { scale: 1, autoAlpha: 1, transformOrign: '50% 50%', ease: Power1.easeInOut }, '-=0.3')
		// .to($('.footer-container .logoContent'), 0.5, { marginBottom: '0px' }, '-=0.5')
	;
	return logoPop;
};
