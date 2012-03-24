var downloadWindow = Ti.UI.currentWindow, DownloadC = require("application/controllers/Download"), DownloadController = new DownloadC();

var WindowWait = require('ui/Screen');
WindowWait = new WindowWait();

var barra = Titanium.UI.createImageView({
	image: '../../images/barraPlaces.png',
	width: "100%",
	//FOR ANDROID
	//top: "-2%"
	//FOR IPHONE
	height: "90",
	top: "-4%"
});

var botonAtras = Titanium.UI.createButton({
	backgroundImage: '../../images/botonAtras.png',
	backgroundSelectedImage: '../../images/botonAtrasPicado.png',
	width: "15%",
	top: "3%",
	left: "1%",
	//FOR IPHONE
	height: "6%"
});

botonAtras.addEventListener('click', function(e){
	downloadWindow.close();
});

downloadWindow.add(barra);
// FOR IPHONE
downloadWindow.add(botonAtras);