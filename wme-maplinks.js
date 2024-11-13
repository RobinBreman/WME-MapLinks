// ==UserScript==
// @name 			WME-MapLinks - BETA
// @description 	Adds links to other maps
// @namespace 		http://tampermonkey.net/
// @author          Robin Breman | L4 Waze NL | @robbre | https://github.com/RobinBreman/WMEFeedSorter
// @match           *://*.waze.com/*editor*
// @exclude         *://*.waze.com/user/editor*
// @grant 			none
// @version 		1.0.0
// ==/UserScript==

(function () {
    'use strict';
    var version = '0.1.4';

    function wmescript_bootstrap() {
        var wazeapi = W || window.W;
        if (!wazeapi || !wazeapi.map) {
            setTimeout(wmescript_bootstrap, 1000);
            return;
        }

        /* begin running the code! */
        addMapLinks();

    }

    function addMapLinks() {
        console.log('Adding maplinks');

        var buttonHTML = $(`
            <div id='MapLinksDiv'>
                
                <div id='WMEMapLinksButtons'>
                    <button id='WMEMapLinksButton4'>BAG</button>
                    <button id='WMEMapLinksButton7'>George</button>
                    <button id='WMEMapLinksButton5'>Mapillary</button>
                    <button id='WMEMapLinksButton1'>Melvin</button>
                    <button id='WMEMapLinksButtonX'>NDW</button>
                    <button id='WMEMapLinksButton3'>Omgevingswet</button>
                    <button id='WMEMapLinksButton2'>SDP</button>
                    <button id='WMEMapLinksButton6'>Wegstatus</button>
                </div>
            </div>`
        );

        $('.secondary-toolbar').prepend(buttonHTML);

        $('#WMEMapLinksButton1').click(gotoMelvin);
        $('#WMEMapLinksButton2').click(gotoSDP);
        $('#WMEMapLinksButton3').click(gotoOmgevingswet);
        $('#WMEMapLinksButton4').click(gotoBAGViewer);
        $('#WMEMapLinksButton5').click(gotoMapillary);
        $('#WMEMapLinksButton6').click(gotoWegstatus);
        $('#WMEMapLinksButton7').click(gotoGeorge);
        $('#WMEMapLinksButtonX').click(x);

    }

    function getMapCoordinates() {

        let pl = $('.permalink')[0].href;
        return {
            y: parseFloat(pl.match(/lat=([0-9]+\.[0-9]+)/)[1]),
            x: parseFloat(pl.match(/lon=([0-9]+\.[0-9]+)/)[1])
        };
    }

    function getMapZoomlevel() {
        let pl = $('.permalink')[0].href;
        return parseFloat(pl.match(/zoomLevel=([0-9]+)/)[1]);
    }


    function gotoMelvin() {
        let coordinates = getMapCoordinates();
        let url = 'https://melvin.ndw.nu/public?sw=' + coordinates.y + ',' + coordinates.x + '&ne=' + coordinates.y + ',' + coordinates.x;
        window.open(url, '_blank');
    }

    function gotoOmgevingswet() {
        let cords = getMapCoordinates();
        let url = 'https://omgevingswet.overheid.nl/regels-op-de-kaart/documenten?regelsandere=regels&locatie-stelsel=ETRS89&locatie-x=' + cords.x + '&locatie-y=' + cords.y;
        window.open(url, '_blank');
    }

    function gotoBAGViewer() {
        let coords = getMapCoordinates();
        let url = 'https://bagviewer.kadaster.nl/lvbag/bag-viewer/?geometry.x=' + coords.x + '&geometry.y=' + coords.y + '&zoomlevel=13.776830703977048';
        window.open(url, '_blank');
    }

    function gotoMapillary() {
        let coordinates = getMapCoordinates();
        let zoom = getMapZoomlevel();
        let url = 'https://www.mapillary.com/app/?lat=' + coordinates.y + '&lng=' + coordinates.x + '&z=' + zoom;
        window.open(url, '_blank');
    }

    function gotoSDP() {
        let coordinates = getMapCoordinates();
        let zoom = getMapZoomlevel();
        let url = 'https://viewer.satellietdataportaal.nl/@' + coordinates.y + ',' + coordinates.x + ',' + zoom;
        window.open(url, '_blank');
    }

    function gotoWegstatus() {
        let coordinates = getMapCoordinates();
        coordinates.y = coordinates.y.toString().replace('.', 'd');
        coordinates.x = coordinates.x.toString().replace('.', 'd');

        //https://www.wegstatus.nl/dashboardnl/lat=51d69761%7Clon=3d744119

        let url = 'https://www.wegstatus.nl/dashboardnl/lat=' + coordinates.y + '%7Clon=' + coordinates.x;
        window.open(url, '_blank');
    }

    function gotoGeorge() {
        let coordinates = getMapCoordinates();
        let url = 'https://wegkenmerken.staging.ndw.nu/verkeersborden?identifier=1,'+coordinates.x+','+coordinates.y;
        window.open(url, '_blank');
    }

    function x() {
        // https://www.arcgis.com/apps/instant/interactivelegend/index.html?appid=d9382ea7bf574c4ba2d5a740469c504f&center=

        let coordinates = getMapCoordinates();
        let url = 'https://www.arcgis.com/apps/instant/interactivelegend/index.html?appid=d9382ea7bf574c4ba2d5a740469c504f&center='+coordinates.x+','+coordinates.y;
        window.open(url, '_blank');
    }

    setTimeout(wmescript_bootstrap, 5000);

})();
