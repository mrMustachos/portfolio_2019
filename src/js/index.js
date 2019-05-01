import './lib/jquery';
import ScrollMagic from 'scrollmagic';
import { clickScrollAction, indexHeroScene } from './components/scrollMagic/index.js';
import initNav from './components/navigation/index.js';

import '../sass/index.scss';


$(function() {
	initNav();
	let controller = new ScrollMagic.Controller(); // Init ScrollMagic
	clickScrollAction(controller);
	indexHeroScene(controller);

	console.log('howdy from index.js');
	$('.currentYear').text((new Date).getFullYear());
});