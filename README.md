# geojson-arquitectura-valencia
GeoJSON de edificios de Valencia + visor mapa con Leaflet.

Actualmente el fichero GeoJSON contiene 50 edificios de Valencia capital. Se utiliza el objeto de tipo Feature para añadir la información de año de construción, los autores, estilos arquitectónicos, foto, link, título, descripción y crédito.

El repositorio incluye también un sencillo ejemplo HTML5 con Leaflet para mostrar la información de los edificios sobre un mapa.

```
{
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [-0.378333, 39.474444]
	},
	"properties": {
		"title": "Lonja de la Seda",
		"description": "Patrimonio de la Humanidad (5 de diciembre de 1996)",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lonja_de_la_Seda.jpg/250px-Lonja_de_la_Seda.jpg",
		"link": "https://es.wikipedia.org/wiki/Lonja_de_la_Seda",
		"styles": ["gótico"],
		"year": "1548",
		"authors": ["Pere Compte"],
		"credit": "Wikipedia"
	}
}
```
