var downloadWindow = Ti.UI.currentWindow, DownloadC = require("application/controllers/Download"), DownloadController = new DownloadC();

var WindowWait = require('ui/Screen');
WindowWait = new WindowWait();

var lista = Titanium.UI.createTableView({
	data: Ti.App.FILES,
	rowHeight: 500,
	top: "11%"
});

lista.addEventListener('click', function(e) {
	var selectionData = e.rowData;
	var webview = Titanium.UI.createWebView({url: Ti.App.SERVER + selectionData.location.replace("public/","/")});
	var window_2 = Titanium.UI.createWindow(); window_2.add(webview); window_2.open({modal:true});
});

var barra = Titanium.UI.createImageView({
	image: '../../images/barraFiles.png',
	width: "100%",
	top: "-2%"
});

var botonAtras = Titanium.UI.createButton({
	backgroundImage: '../../images/botonAtras.png',
	backgroundSelectedImage: '../../images/botonAtrasPicado.png',
	width: "15%",
	top: "-9%",
	left: "1%"
});

botonAtras.addEventListener('click', function(e){
	downloadWindow.close();
});

downloadWindow.add(barra);
downloadWindow.add(botonAtras);
downloadWindow.add(lista);