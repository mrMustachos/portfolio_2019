import currentMenuSelect from './currentMenuSelect.js';
import { navTimeline, resetNavTransform } from './gsap.js';

export default function() {
	// making gsap responsive
	// https://greensock.com/forums/topic/18280-truly-responsive-animations/
	// https://codepen.io/mrMustachos/pen/MREjPM?editors=1111

	// maybe you can do it backward too?
	// tl.tweenFromTo('labelName1', 'labelName2');

	$(document).ready(function() {
		currentMenuSelect();
		let menu = navTimeline();

		const flipper = () => {
			if ($(window).width() >= 800) {
				$('.menu .menu__list').css('transform', 'translate(0%, 0%)');
			}
			return;
		}

		flipper();
		$(window).resize(() => flipper());

		$(document).on('click', '.menu-icon, .menu__link', function(e) {
			menu.reversed() ? menu.play() : menu.reverse();
		});

	});
}
