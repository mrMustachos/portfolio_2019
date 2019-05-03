const fs = require('fs-extra');
const { disDir, cacheDir, distFile } = require('./filePaths.js');

const clean = () => {
	fs.remove(disDir)
	.then(() => fs.remove(cacheDir))
	.catch((err) => console.error(err));
};

// url(dist/
const getHTML_tags = new RegExp(/(href=\"dist\/)(.*?)(\..*?\")/g);
const getPHP_tags = new RegExp(/(<pre data-php=")(.*?)(">.*?<\/pre>)/g);

const testPHPtags_images = new RegExp(/(src="images\/)(.*?)(\..*?)"/g);
const prodImgPath = new RegExp(/(src=")(.*?\/dist\/)(.*?)"/g);

// let htmlPageData = () => {
// 	return fs.readdir(disDir)
// 	.then((files) => {
// 		let justHTML = files.filter((file) => file.endsWith('.html'));
// 		let promises = [], htmlFileName = [];

// 		justHTML.forEach((item) => {
// 			let filePath = distFile(item);
// 			promises.push(fs.readFile(distFile(item), 'utf8'))
// 			htmlFileName.push(filePath)
// 		});
// 		return Promise.all(promises).then((data) => [data, htmlFileName]);
// 	})
// 	.catch((err) => console.error(err));
// };

// let renderPartials = () => {
// 	let getDocs = htmlPageData();

// 	getDocs.then((result) => {
// 		let dataTemp = [], pathName = result[1], htmlBody = result[0];

// 		htmlBody.forEach((data, idx) => {
// 			let tagTemp = [], casheTemp = [];
// 			let tags, cashe, obj = {};

// 			data = data.replace(/\n/g, '').replace(/\t/g, '');

// 			obj.doc = data;
// 			obj.pathName = pathName[idx];

// 			let linkChop = data.replace(getHTML_tags, (match, openingTag, linkContent, closeTag) => {
// 				// tags = linkContent.replace(/`/g, '"');
// 				// console.log('match: ', match);
// 				// console.log('openingTag: ', openingTag);
// 				// console.log('linkContent: ', linkContent);
// 				// console.log('closeTag: ', closeTag);

// 				if (closeTag === `.html"`) {
// 					let shortPath = openingTag.replace('dist/', '');
// 					let shortLink = `${shortPath}${linkContent}${closeTag}`;
					
// 					tags = shortLink.replace('index.html', '/');
// 				}

// 				// let imgChecker = tags.replace(testPHPtags_images, (imgURL, openingSCR, imgName, closeSCR) => {
// 				// 	let getProdPath;

// 				// 	let imgProdPath = match.replace(prodImgPath, (all, srcGrabber, imgPathProd, imgNameProd) => {
// 				// 		if (imgNameProd.startsWith(imgName)) {
// 				// 			getProdPath = [imgPathProd, imgNameProd].join('');
// 				// 		}
// 				// 	});

// 				// 	tags = tags.replace(imgURL, `src="${getProdPath}"`);
// 				// });

// 				cashe = match;
// 				tagTemp.push(tags);
// 				casheTemp.push(cashe);
// 				return;
// 			});

// 			obj.tags = tagTemp;
// 			obj.cashe = casheTemp;

// 			if (obj.tags.length > 0) { dataTemp.push(obj); }
// 		});

// 		return dataTemp;
// 	})
// 	.then((data) => {
// 		let saveMe = []

// 		data.forEach(({ doc, pathName, tags, cashe }) => {
// 			let updated = {};
// 			updated.pathName = pathName;
// 			cashe.forEach((findMe, idx) => doc = doc.replace(findMe, tags[idx]));

// 			// fs.outputFile(pathName, doc);
// 			saveMe.push(updated);
// 		});

// 		return Promise.all(saveMe).then((data) => console.log(`files w/ updated HTML link filePaths: `, data));
// 	})
// 	.catch((err) => console.error(err));
// };

let getFileData = (fileExtension) => {
	return fs.readdir(disDir)
	.then((files) => {
		let justHTML = files.filter((file) => file.endsWith(fileExtension));
		let promises = [], htmlFileName = [];

		justHTML.forEach((item) => {
			let filePath = distFile(item);
			promises.push(fs.readFile(distFile(item), 'utf8'))
			htmlFileName.push(filePath)
		});
		return Promise.all(promises).then((data) => [data, htmlFileName]);
	})
	.catch((err) => console.error(err));
};

const htmlLinkClean = (data) => {
	let tagTemp = [], casheTemp = [];
	let tags, cashe;

	let linkChop = data.replace(getHTML_tags, (match, openingTag, linkContent, closeTag) => {
		if (closeTag === `.html"`) {
			let shortPath = openingTag.replace('dist/', '/');
			let shortLink = `${shortPath}${linkContent}${closeTag}`;
			
			tags = shortLink.replace('/index.html', '/');

			if (!!tags) {
				cashe = match;
				tagTemp.push(tags);
				casheTemp.push(cashe);
			}
		}
		return;
	});

	// console.log('casheTemp: ', casheTemp.length, casheTemp);
	// console.log('tagTemp: ', tagTemp.length, tagTemp);
	// console.log('\n////////////////////////////////\n')

	return { tagTemp, casheTemp };
};

const fontLinkClean = (data) => {
	let tagTemp = [], casheTemp = [];
	let tags, cashe;

	tags = data.replace(/url\(dist\//g, 'url(');

	tagTemp.push(tags);
	casheTemp.push(data);

	// console.log('casheTemp: ', casheTemp.length, casheTemp);
	// console.log('tagTemp: ', tagTemp.length, tagTemp);
	// console.log('\n////////////////////////////////\n')

	return { tagTemp, casheTemp };
};

let renderPartials = (extensionType, contentEdit) => {
	// let getDocs = getFileData('.html');
	let getDocs = getFileData(extensionType);

	getDocs.then((result) => {
		let dataTemp = [], pathName = result[1], htmlBody = result[0];

		htmlBody.forEach((data, idx) => {
			let obj = {};
			data = data.replace(/\n/g, '').replace(/\t/g, '');
			let { tagTemp, casheTemp } = contentEdit(data);
			// let { tagTemp, casheTemp } = htmlLinkClean(data);

			obj.doc = data;
			obj.pathName = pathName[idx];
			obj.tags = tagTemp;
			obj.cashe = casheTemp;

			if (obj.tags.length > 0) {
				dataTemp.push(obj);
				// console.log('\nobj: ', obj);
			}
		});

		return dataTemp;
	})
	.then((data) => {
		let saveMe = []

		data.forEach(({ doc, pathName, tags, cashe }) => {
			let updated = {};
			updated.pathName = pathName;
			cashe.forEach((findMe, idx) => doc = doc.replace(findMe, tags[idx]));

			fs.outputFile(pathName, doc);
			saveMe.push(updated);
		});

		return Promise.all(saveMe).then((data) => console.log(`\n/////////////////////////////////////\nfiles w/ ${extensionType} link filePaths:\n/////////////////////////////////////\n`, data));
	})
	.catch((err) => console.error(err));
};

const postBuild = () => {
	fs.remove(cacheDir) // deletes the root level .cache/ folder
	.then(() => renderPartials('.html', htmlLinkClean)) // update .html internal file linking paths
	.then(() => renderPartials('.css', fontLinkClean)) // update .css files type paths
	// .then(() => fs.readdir(disDir)) // reads files in root level dist/ folder
	// .then((files) => files.filter((file) => file.endsWith('.html'))) // creates array of all .html files
	// .then((list) => list.forEach((item) => fs.move(distFile(item)), '/')) // removes all .html files files from root level dist/ folder
	.catch((err) => console.error(err));
}

module.exports = { clean, postBuild, renderPartials, htmlLinkClean, fontLinkClean };