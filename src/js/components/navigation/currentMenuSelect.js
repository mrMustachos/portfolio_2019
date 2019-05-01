export default function() {
	const menuArr = $('.menu');

	menuArr.each((idx, ele) => {
		const menuItems = $(ele).find('.menu__link');
		const setCurrent = (ev) => {
			ev.preventDefault();
			const currItem = $(ev.target);
			const currLink = currItem.attr('href');
			const currParent = currItem.parent();
			const { origin } = new URL(window.location.href);

			if (currParent.hasClass('menu__item--current')) return false;

			$(ele).find('.menu__item--current').removeClass('menu__item--current');
			currParent.addClass('menu__item--current');

			if (!(currLink.startsWith('#'))) {
				const nextPage = () => window.location.href = `${origin}${currLink}`;
				setTimeout(nextPage, 600);
			}
		};

		menuItems.each((idx, ele) => ele.addEventListener('click', setCurrent));
	});
}