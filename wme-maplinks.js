// ==UserScript==
// @name 			WME-MapLinks
// @description 	Adds links to other maps
// @namespace 		http://tampermonkey.net/
// @author          Robin Breman | L4 Waze NL | @robbre | https://github.com/RobinBreman/WME-MapLinks
// @match           *://*.waze.com/*editor*
// @exclude         *://*.waze.com/user/editor*
// @grant 			none
// @version 		1.2.1
// ==/UserScript==

(function () {
    'use strict';
    var version = '1.2.1';

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

        var buttonHTML = $(`

            <style>
                #WMEMapLinksButtons img { height: 50%}
            </style>
            <div id='MapLinksDiv'>
                
                <div id='WMEMapLinksButtons'>
                    <button id='WMEMapLinksButton_BAG' title='BAG'>
                        <img src='https://www.kadaster.nl/favicon.ico'>
                    </button>
                    <button id='WMEMapLinksButton_George' title='George'>
                       <img src='https://wegkenmerken.staging.ndw.nu/favicon.ico'>
                    </button>
                    <button id='WMEMapLinksButton_Mapillary' title='Mapillary'>
                       <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/tMT3WIParw8.png'>
                    </button>
                    <button id='WMEMapLinksButton_Melvin' title='Melvin'>
                        <img src='https://melvin.ndw.nu/assets/icon/favicon-32.png'>
                    </button>
                    <button id='WMEMapLinksButton_NDW' title='NDW'>
                        <img src='https://www.arcgis.com/favicon.ico'>
                    </button>
                    <button id='WMEMapLinksButton_Omgevingswet' title='Omgevingswet'>
                        <img src='https://omgevingswet.overheid.nl/favicon.ico'>
                    </button>
                    <button id='WMEMapLinksButton_Satellietdataportaal' title='Satellietdataportaal'>
                        <img src="https://www.satellietdataportaal.nl/favicon.ico">
                    </button>
                    <button id='WMEMapLinksButton_Wegstatus' title='Wegstatus'>
                        <img src="https://www.wegstatus.nl/favicon.ico">
                    </button>
                </div>
            </div>`
        );

        $('.secondary-toolbar').prepend(buttonHTML);

        $('#WMEMapLinksButton_Melvin').click(gotoMelvin);
        $('#WMEMapLinksButton_Satellietdataportaal').click(gotoSDP);
        $('#WMEMapLinksButton_Omgevingswet').click(gotoOmgevingswet);
        $('#WMEMapLinksButton_BAG').click(gotoBAGViewer);
        $('#WMEMapLinksButton_Mapillary').click(gotoMapillary);
        $('#WMEMapLinksButton_Wegstatus').click(gotoWegstatus);
        $('#WMEMapLinksButton_George').click(gotoGeorge);
        $('#WMEMapLinksButton_NDW').click(gotoNDW);

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
        let url = 'https://bagviewer.kadaster.nl/lvbag/bag-viewer/?theme=BRT+Achtergrond&geometry.x=' + coords.x + '&geometry.y=' + coords.y + '&zoomlevel=13.776830703977048';
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

        let url = 'https://www.wegstatus.nl/dashboardnl_old/lat=' + coordinates.y + '%7Clon=' + coordinates.x;
        window.open(url, '_blank');
    }

    function gotoGeorge() {
        let coordinates = getMapCoordinates();
        let url = 'https://wegkenmerken.staging.ndw.nu/verkeersborden?identifier=1,'+coordinates.x+','+coordinates.y;
        window.open(url, '_blank');
    }

    function gotoNDW() {
        // https://www.arcgis.com/apps/instant/interactivelegend/index.html?appid=d9382ea7bf574c4ba2d5a740469c504f&center=

        let coordinates = getMapCoordinates();
        let url = 'https://www.arcgis.com/apps/instant/interactivelegend/index.html?appid=d9382ea7bf574c4ba2d5a740469c504f&center='+coordinates.x+','+coordinates.y;
        window.open(url, '_blank');
    }

    setTimeout(wmescript_bootstrap, 5000);

})();
