var placesWindow = Ti.UI.currentWindow, PlacesC = require("application/controllers/Places"), PlacesController = new PlacesC();

var WindowWait = require('ui/Screen');
WindowWait = new WindowWait();

var barra = Titanium.UI.createImageView({
	image: '../../images/barraPlaces.png',
	width: "100%",
	top: "-2%"
});

var botonAtras = Titanium.UI.createButton({
	backgroundImage: '../../images/botonAtras.png',
	backgroundSelectedImage: '../../images/botonAtrasPicado.png',
	width: "15%",
	top: "3%",
	left: "1%"
});

botonAtras.addEventListener('click',function(e){
	placesWindow.close();
});

var lista = Titanium.UI.createTableView({
	data: Ti.App.PLACES,
	rowHeight: 500,
	top: "11%"
});

lista.addEventListener('click', function(e) {
	WindowWait.show();
	Ti.App.SELECTION_DATA = e.rowData;
	PlacesController.findOrCreatePlace(Ti.App.UPLOAD, WindowWait);
});

placesWindow.add(barra);
//placesWindow.add(botonAtras);

if(lista.data.length > 0){
	placesWindow.add(lista);
}else{
	var noPlaces = Titanium.UI.createImageView({
		url: '../../images/noPlaces.png',
		width: "85%"
	});
	
	placesWindow.add(Titanium.UI.createView({height:"10%"}));
	placesWindow.add(noPlaces);			
}