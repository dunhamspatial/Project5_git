google.load('visualization', '1', { 'packages': ['table'] });
var map;
var markers;
var infoWindow;

function initMap() {
    markers = [];
    infoWindow = new google.maps.InfoWindow()

    var center = new google.maps.LatLng(48, -104);

    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        center: center,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var sql = encodeURIComponent("SELECT Name, Med_Inc, X, Y FROM 1grn8jrQ1ln1dS7B1G0y6vb8dWwVpg23NDXhz97ox ORDER BY Name");
    var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + sql);

    query.send(getData);
}

function getData(response) {
    var dt = response.getDataTable();

    var side_html = '<table style="border-collapse: collapse" border="1" \
                       cellpadding="5"> \
                       <thead> \
                         <tr style="background-color:#DFF0D8"> \
                           <th>State</th> \
                           <th>Median Household Income</th> \
                         </tr> \
                       </thead> \
                       <tbody>';

    for (var i = 0; i < dt.getNumberOfRows() ; i++) {
        var lat = dt.getValue(i, 3);
        var lng = dt.getValue(i, 2);
        var name = dt.getValue(i, 0);
        var medInc = dt.getValue(i, 1);

        var pt = new google.maps.LatLng(lat, lng);

        var html = "<strong>" + name + "</strong><br />" + medInc;

        side_html += '<tr> \
                      <td><a href="javascript:myclick(' + i + ')">' + '  ' + name + '</a></td> \
                      <td>' +'     ' + '$' + medInc + '</td> \
                    </tr>';


        createMarker(pt, html);

    }

    side_html += '</tbody> \
                </table>';
    document.getElementById("sidebar").innerHTML = side_html;
}


function createMarker(point, info) {
    var iconURL = 'dollarsign.png'; var iconSize = new google.maps.Size(14, 26);
    var iconOrigin = new google.maps.Point(0, 0); var iconAnchor = new google.maps.Point(7, 26);

    var myIcon = {
        url: iconURL,
        size: iconSize,
        origin: iconOrigin,
        anchor: iconAnchor
    };

    var iconShape = [0,0, 14,26];
    var myMarkerShape = {
        coord: iconShape,
        type: 'rect'
    };

    var myMarkerOpts = {
        position: point,
        map: map,
        icon: myIcon,
        shape: myMarkerShape
    };

    var marker = new google.maps.Marker(myMarkerOpts);

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.close();
        infoWindow.setContent(info);
        infoWindow.open(map, marker);
    });
}

function myclick(num) {
    google.maps.event.trigger(markers[num], "click");
}
