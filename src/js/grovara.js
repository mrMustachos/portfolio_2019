import './lib/jquery';
import ScrollMagic from 'scrollmagic';
import { clickScrollAction, projectHeroScene } from './components/scrollMagic/index.js';
import initNav from './components/navigation/index.js';
import { flkty } from './components/flickity_single.js';

import '../sass/grovara.scss';

$(function() {
	initNav();
	flkty();
	let controller = new ScrollMagic.Controller(); // Init ScrollMagic
	clickScrollAction(controller);
	projectHeroScene(controller);

	console.log('howdy from grovara.js');
	$('.currentYear').text((new Date).getFullYear());
});