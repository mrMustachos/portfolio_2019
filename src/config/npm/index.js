const fs = require('fs-extra');
const { disDir, cacheDir } = require('./filePaths.js');

const clean = () => {
	fs.remove(disDir)
	.then(() => fs.remove(cacheDir))
	.catch((err) => console.error(err));
};

module.exports = { clean };