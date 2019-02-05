var map = null;

function inicializar(){    

    map = L.map('map',{
        center: [39.472, -0.374],
        minZoom: 0,
        maxZoom: 20,
        zoom: 14
    });    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {    
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        minZoom: 0,
        maxZoom: 20
    }).addTo(map);

    //map.locate({setView: true, maxZoom: 8});
    //map.on('locationfound', onLocationFound);
    //map.on('locationerror', onLocationError);
    
    $.getJSON("arquitecturavalencia.geojson", function(json) {
        L.geoJSON(json, {
            onEachFeature: onEachFeature
        }).addTo(map);
    });        
}

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.title) {
        var htmlPopup = "<h1>" + feature.properties.title + 
            "</h1>" + feature.properties.description + "<br />";
        
        if(feature.properties.styles){
            htmlPopup += feature.properties.styles.join(", ") + "<br />";
        }
        
        htmlPopup += feature.properties.authors.join(", ") + "<br />" +
            feature.properties.year + "<br />" +
            "<a href='" + feature.properties.link + "' target='_blank'><img class='imagepopup' src='" +  
            feature.properties.image + "'/></a><br />Credit: " + feature.properties.credit;
        
        layer.bindPopup(htmlPopup);
    }
}

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Estás a +- " + radius + " metros de aquí.").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}