const headElements = './src/config/head.info.json';
const imgPath = process.env.NODE_ENV === 'development' ? '' : '';
const favIconLevel = process.env.NODE_ENV === 'development' ? false : true;
const root = `${__dirname}/src`;

const configuration = {
  path: imgPath, // Path for overriding default icons path. `string`
  appName: "Bill Domanick", // Your application's name. `string`
  appDescription: "Portfolio Website of Bill Domanick", // Your application's description. `string`
  developerName: "mrMustachos", // Your (or your developer's) name. `string`
  developerURL: "http://www.billdomanick.com", // Your (or your developer's) URL. `string`
  dir: "auto", // Primary text direction for name, short_name, and description
  lang: "en-US", // Primary language for name and short_name
  background: "#fff", // Background color for flattened icons. `string`
  theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
  display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
  version: "1.0", // Your application's version string. `string`
  logging: false,
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: favIconLevel, // Create Android homescreen icon. `boolean` or `{ offset, background }`
    appleIcon: favIconLevel, // Create Apple touch icons. `boolean` or `{ offset, background }`
    appleStartup: favIconLevel, // Create Apple startup images. `boolean` or `{ offset, background }`
    coast: favIconLevel, // Create Opera Coast icon. `boolean` or `{ offset, background }`
    favicons: true, // Create regular favicons. `boolean`
    firefox: favIconLevel, // Create Firefox OS icons. `boolean` or `{ offset, background }`
    windows: favIconLevel, // Create Windows 8 tile icons. `boolean` or `{ background }`
    yandex: favIconLevel // Create Yandex browser icon. `boolean` or `{ background }`
  }
};

// tbd
// https://github.com/nju33/posthtml-collect-inline-styles
// https://github.com/posthtml/posthtml-style-to-file
// https://github.com/posthtml/posthtml-expressions
// https://github.com/posthtml/posthtml-urls


module.exports = {
  plugins: [
    require('posthtml-head-elements')({ headElements }), // https://github.com/TCotton/posthtml-head-elements
    require('posthtml-include')({ root }), // https://github.com/posthtml/posthtml-include
    require('posthtml-spaceless')({}), // https://github.com/posthtml/posthtml-spaceless
    require('posthtml-favicons')({ configuration }), // https://github.com/mohsen1/posthtml-favicons
  ]
}