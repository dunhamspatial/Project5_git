google.load('visualization', '1', { 'packages': ['table'] });
var map;
var markers;
var infoWindow;

function initMap() {
    markers = [];
    infoWindow = new google.maps.InfoWindow()

    var center = new google.maps.LatLng(40.14742784294337, -85.41570198864997);

    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        center: center,
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var sql = encodeURIComponent("SELECT Name, Med_Inc, X, Y FROM 1grn8jrQ1ln1dS7B1G0y6vb8dWwVpg23NDXhz97ox ORDER BY Name");
    var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + sql);

    alert(String(query));

    query.send(getData);
}

function getData(response) {
    var dt = response.getDataTable();

    var side_html = '<table style="border-collapse: collapse" border="1" \
                       cellpadding="5"> \
                       <thead> \
                         <tr style="background-color:#e0e0e0"> \
                           <th>City</th> \
                           <th>Population</th> \
                         </tr> \
                       </thead> \
                       <tbody>';

    for (var i = 0; i < dt.getNumberOfRows() ; i++) {
        var lat = dt.getValue(i, 3);
        var lng = dt.getValue(i, 2);
        var name = dt.getValue(i, 0);
        var pop = dt.getValue(i, 1);

        var pt = new google.maps.LatLng(lat, lng);

        var html = "<strong>" + name + "</strong><br />" + pop;

        side_html += '<tr> \
                      <td><a href="javascript:myclick(' + i + ')">' + name + '</a></td> \
                      <td>' + pop + '</td> \
                    </tr>';


        createMarker(pt, html);

    }

    side_html += '</tbody> \
                </table>';
    document.getElementById("sidebar").innerHTML = side_html;
}


function createMarker(point, info) {
    var iconURL = 'coneandshadow.png'; var iconSize = new google.maps.Size(20, 34);
    var iconOrigin = new google.maps.Point(0, 0); var iconAnchor = new google.maps.Point(10, 34);

    var myIcon = {
        url: iconURL,
        size: iconSize,
        origin: iconOrigin,
        anchor: iconAnchor
    };

    var iconShape = [8, 33, 4, 15, 1, 15, 0, 12, 0, 5, 6, 0, 12, 0, 19, 14, 15, 15, 10, 33];
    var myMarkerShape = {
        coord: iconShape,
        type: 'poly'
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






////google.load('visualization', '1', { 'packages': ['table'] });

//function initMap() {
//    var map = new google.maps.Map(document.getElementById('mapCanvas'), {
//        center: new google.maps.LatLng(40.14742784294337, -85.41570198864997),
//        zoom: 3,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    });


//    layer = new google.maps.FusionTablesLayer({
//        map: map,
//        heatmap: { enabled: false },
//        query: {
//            select: "col0",
//            from: "1Nv_rJPZdvqj99Qp4fFT1J1pH44U8TEehvc0Qxaxr",
//            where: ""
//        },
//        options: {
//            styleId: 2,
//            templateId: 2
//        }
//    });
//    layer.setMap(mapCanvas);
//}




//google.maps.event.addDomListener(window, 'load', initMap);
