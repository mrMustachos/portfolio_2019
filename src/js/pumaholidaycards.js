import './lib/jquery';
import ScrollMagic from 'scrollmagic';
import { clickScrollAction, projectHeroScene } from './components/scrollMagic/index.js';
import initNav from './components/navigation/index.js';
import { flkty } from './components/flickity.js';

import '../sass/pumaholidaycards.scss';

$(function() {
	initNav();
	flkty();
	let controller = new ScrollMagic.Controller(); // Init ScrollMagic
	clickScrollAction(controller);
	projectHeroScene(controller);

	console.log('howdy from pumaholidaycards.js');
	$('.currentYear').text((new Date).getFullYear());
});