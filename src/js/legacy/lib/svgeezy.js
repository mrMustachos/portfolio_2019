/*!
SVGeezy.js - http://benhowdle.im/svgeezy/
*/
/******************************************************
 * A simple JavaScript plugin which detects SVG images
 * on your website, and automatically "looks" for a
 * standard image fallback for those older browsers.
 *
 * call like so, pass in a class name that you don't
 * want it to check and a filetype to replace .svg
 * with svgeezy.init('nocheck', 'png');
 ******************************************************/

window.svgeezy = function() {

	return {
		init: function(t, i) {
			this.avoid = t || false;
			this.filetype = i || "png";
			this.svgSupport = this.supportsSvg();
			if (!this.svgSupport) {
				this.images = document.getElementsByTagName("img");
				this.imgL = this.images.length;
				this.fallbacks()
			}
		},

		fallbacks: function() {
			while (this.imgL--) {
				if (!this.hasClass(this.images[this.imgL], this.avoid) || !this.avoid) {
					var t = this.images[this.imgL].getAttribute("src");
					if (t === null) {
						continue
					}
					if (this.getFileExt(t) == "svg") {
						var i = t.replace(".svg", "." + this.filetype);
						this.images[this.imgL].setAttribute("src", i)
					}
				}
			}
		},

		getFileExt: function(t) {
			var i = t.split(".").pop();
			if (i.indexOf("?") !== -1) {
				i = i.split("?")[0]
			}
			return i
		},

		hasClass: function(t, i) {
			return (" " + t.className + " ").indexOf(" " + i + " ") > -1
		},

		supportsSvg: function() {
			return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
		}
	}
}();