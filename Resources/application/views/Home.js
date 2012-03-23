var homeWindow = Ti.UI.currentWindow, HomeC = require("application/controllers/Home"), HomeController = new HomeC();

var WindowWait = require('ui/Screen');
WindowWait = new WindowWait();

var view1 = Titanium.UI.createView({
	layout: 'vertical',
	backgroundImage: '../../images/fondo.png',
	width: "100%",
	height: "100%"
});

var uploadButton = Titanium.UI.createButton({
	backgroundImage: '../../images/botonSubida.png',
	backgroundSelectedImage: '../../images/botonSubidaPicado.png',
	width: "92%",
	height: "20%",
	//FOR IPHONE
	top: "45%"
});

var downloadButton = Titanium.UI.createButton({
	backgroundImage: '../../images/botonDescarga.png',
	backgroundSelectedImage: '../../images/botonDescargaPicado.png',
	width: "92%",
	height: "20%",
	//FOR IPHONE
	top: "70%"
});

uploadButton.addEventListener('click', function(e){
	HomeController.upload(WindowWait);
});

downloadButton.addEventListener('click', function(e){
	HomeController.download(WindowWait);
});

var logo = Titanium.UI.createImageView({
	image: '../../images/LogoWithSubtitle_chico.png',
	/*FOR ANDROID
	top: "12%",
	width: "65%"	 
	*/	
	width: "65%",
	height: "65%",
	top: "-10%"
});

//for IOS
homeWindow.add(view1, logo, uploadButton, downloadButton);
/* FOR ANDROID
view1.add(logo);
view1.add(Titanium.UI.createView({height:"10%"}));		
view1.add(uploadButton);
view1.add(Titanium.UI.createView({height:"4%"}));
view1.add(downloadButton);

homeWindow.add(view1);*/
