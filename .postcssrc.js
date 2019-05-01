// clear clean builds and check both side of the css see if the unprefix is working
// might need to lower the browserlist thresholds to get it to kick in.



// tbd
// https://github.com/css-modules/postcss-modules
// https://github.com/luisrudge/postcss-flexbugs-fixes
// https://github.com/gucong3000/postcss-unprefix

module.exports = {
  // "modules": true,
  "plugins": [
  	// require("postcss-unprefix")({}), // https://github.com/gucong3000/postcss-unprefix
  	require("autoprefixer")({ "grid": true }) // https://github.com/postcss/autoprefixer
  ]
}