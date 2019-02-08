var map = null;
var geoJson = null;
var layerGeoJson = null;

var filterPropertyName = null;
var filterPropertyValue = null;

var btnRemoveFilter = null;

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
        geoJson = json;
        loadGeoJson(geoJson);
    });         
    
    btnRemoveFilter = L.easyButton('fa-eraser', function(btn, map){
        filterBy(null, null);
    }).addTo(map);
    btnRemoveFilter.disable();
}

function loadGeoJson(json){    
    layerGeoJson = L.geoJSON(json, {
        onEachFeature: onEachFeature,
        filter: filterFeature
    }).addTo(map);
}

function filterFeature(feature, layer) {
    if(!filterPropertyName || !filterPropertyValue) return true;

    if(feature.properties[filterPropertyName]){
        var p = feature.properties[filterPropertyName];
        return (p == filterPropertyValue  || (Array.isArray(p) && p.includes(filterPropertyValue)));
    }
    else{
        return false;
    }
}

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.title) {
        var htmlPopup = "<h1>" + feature.properties.title + 
            "</h1>" + feature.properties.description + "<br />";
        
        if(feature.properties.styles){
            for (var i=0; i<feature.properties.styles.length; i++) {
                var value = feature.properties.styles[i];
                htmlPopup += "<a href='#' onClick=\"return filterBy('styles', '" + value + "');\">" + value + 
                             " <i class='fas fa-filter'></i></a> ";
            }
            htmlPopup += "<br />";
        }

        if(feature.properties.authors){
            for (var i=0; i<feature.properties.authors.length; i++) {
                var value = feature.properties.authors[i];
                htmlPopup += "<a href='#' onClick=\"return filterBy('authors', '" + value + "');\">" + value + 
                             " <i class='fas fa-filter'></i></a> ";
            }
            htmlPopup += "<br />";
        }
        
        htmlPopup += feature.properties.year + "<br />" +
            "<a href='" + feature.properties.link + "' target='_blank'><img class='imagepopup' src='" +  
            feature.properties.image + "'/></a><br />Credit: " +             
            "<a href='" + feature.properties.link + "' target='_blank'>" + feature.properties.credit + 
            " <i class='fas fa-external-link-alt'></i></a>";
        
        layer.bindPopup(htmlPopup);
    }
}

function filterBy(name, value){
    filterPropertyName = name;
    filterPropertyValue = value;

    if(filterPropertyName) btnRemoveFilter.enable();
    else btnRemoveFilter.disable();

    map.removeLayer(layerGeoJson);
    loadGeoJson(geoJson);

    return false;
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