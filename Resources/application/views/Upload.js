var uploadWindow = Ti.UI.currentWindow, UploadC = require("application/controllers/Upload"), UploadController = new UploadC();

var WindowWait = require('ui/Screen');
WindowWait = new WindowWait();

var barra = Titanium.UI.createImageView({
	image: '../../images/barraFiles.png',
	width: "100%",
	//FOR ANDROID
	//top: "-2%",
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
	uploadWindow.close();
});

var pictureButton = Titanium.UI.createButton({
	backgroundImage: '../../images/botonGaleria.png',
	width: "70%",
	height: "25%",
	//FOR IPHONE
	top: "25%"
});

var cameraButton = Titanium.UI.createButton({
	backgroundImage: '../../images/botonCamara.png',
	width: "70%",
	height: "25%",
	//FOR IPHONE
	top: "60%"
});

var view1 = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../../images/fondo.png',
		width: "100%",
		height: "100%"
});

var logo = Titanium.UI.createImageView({
	url: '../../images/LogoWithSubtitle_chico.png',
	top: "6%",
	width: "65%"
});

cameraButton.addEventListener('click', function(e){
	UploadController.camera(uploadWindow);	
});

pictureButton.addEventListener('click', function(e){
	UploadController.picture(uploadWindow);
});

/* For ANDROID
view1.add(barra);
view1.add(Titanium.UI.createView({height:"15%"}));
view1.add(pictureButton);
view1.add(Titanium.UI.createView({height:"10%"}));
view1.add(cameraButton);

uploadWindow.add(view1);*/

//view1.add(botonAtras);
//view1.add(logo);
uploadWindow.add(view1, barra, botonAtras, pictureButton, cameraButton);