var placesWindow = Ti.UI.currentWindow, PlacesC = require("application/controllers/Places"), PlacesController = new PlacesC();

var WindowWait = require('ui/Screen');
WindowWait = new WindowWait();

var barra = Titanium.UI.createImageView({
	image: '../../images/barraPlaces.png',
	width: "100%",
	//FOR ANDROID
	top: "-2%"
	//FOR IPHONE
	//height: "90",
	//top: "-4%"
});

var botonAtras = Titanium.UI.createButton({
	backgroundImage: '../../images/botonAtras.png',
	backgroundSelectedImage: '../../images/botonAtrasPicado.png',
	width: "15%",
	top: "3%",
	left: "1%",
	//FOR IPHONE
	//height: "6%"
});

botonAtras.addEventListener('click',function(e){
	placesWindow.close();
});

placesWindow.add(barra);
//FOR IPHONE
//placesWindow.add(botonAtras);