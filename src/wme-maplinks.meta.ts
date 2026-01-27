// ==UserScript==
// @name 			WME-MapLinks
// @description 	Adds links to other maps
// @namespace 		http://tampermonkey.net/
// @author          Robin Breman | L4 Waze NL | @robbre | https://github.com/RobinBreman/WME-MapLinks
// @match           *://*.waze.com/*editor*
// @exclude         *://*.waze.com/user/editor*
// @grant 			none
// @require         https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.8.0/proj4.js
// @version 		1.4.1
// @updateURL    https://github.com/RobinBreman/WME-MapLinks/raw/main/wme-maplinks.meta.js
// @downloadURL  https://github.com/RobinBreman/WME-MapLinks/raw/main/wme-maplinks.js
// @supportURL   https://github.com/RobinBreman/WME-MapLinks/issues
// @homepageURL  https://github.com/RobinBreman/WME-MapLinks
// @run-at       document-end      // After DOM loads (default)
// ==/UserScript==