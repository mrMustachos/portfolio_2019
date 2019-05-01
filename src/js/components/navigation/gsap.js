import { TimelineMax, TweenMax } from "gsap/all";

export function navTimeline() {
	let navTL = new TimelineMax({ paused: true, reversed: true });
	navTL
		.set($('.menu .menu__list'), { opacity: 1, className: '+=active' })
		.to($('#hero_image_play .hero__logo img'), 0.5, { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%', ease: Power1.easeNone }, 0)
		.to($('body:not(.projects) #nav .logo'), 0.3, { opacity: 1, scale: 1, ease: Power1.easeNone }, '-=0.2')
		// .fromTo($('body:not(.projects) #nav .logo'), 0.3,
		// 	{ opacity: $(window).width() < 800 ? 0 : 1, scale: $(window).width() < 800 ? 0 : 1, transformOrigin: 'center center', ease: Power1.easeNone },
		// 	{ opacity: 1, scale: 1, ease: Power1.easeNone }
		// , '-=0.2')
		.to($('#burger1'), 0.2, { yPercent: 200 }, 'cross', 0)
		.to($('#burger3'), 0.2, { yPercent: -200 }, 'cross', 0)
		.to($('#burger2'), 0.1, { autoAlpha: 0 }, 'cross', '-=0.05')
		.to($('#burger1'), 0.5, { rotation: 45, transformOrigin: '50% 50%', ease: Power1.easeNone }, 'cross', '-=0.2')
		.to($('#burger3'), 0.5, { rotation: -45, transformOrigin: '50% 50%', ease: Power1.easeNone }, 'cross', '-=0.2')
		.to($('.menu .menu__list'), 0.5, { yPercent: 100, ease: Power1.easeNone }, '-=0.7')
	;
	return navTL;
};

export function resetNavTransform() {
	let reset = TweenMax.to($(`.menu .menu__list.active`), 0.01, { yPercent: -100, ease: Power1.easeNone });
	console.log('fired');
	return reset;
}