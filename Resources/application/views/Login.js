var loginWindow = Ti.UI.currentWindow, LoginC = require("application/controllers/Login"), LoginController = new LoginC();

var view1 = Titanium.UI.createView({
	layout: 'vertical',
	backgroundImage: '../../images/fondo.png',
	width: "100%",
	height: "100%"
});

var logo = Titanium.UI.createImageView({
	image: '../../images/LogoWithSubtitle_chico.png',
	/*FOR ANDROID
	top: "12%",
	width: "70%"	 
	*/	
	width: "70%",
	height: "70%",
	top: "-10%"
});

var loginBtn = Titanium.UI.createButton({
	backgroundImage: '../../images/fb-connect-large.png',
	/*FOR ANDROIDwidth: "80%",
	height: "8%"*/
	width: "90%",
	height: "10%",
	top: "60%"
});

loginBtn.addEventListener('click', LoginController.authorize);

Titanium.Facebook.appid = Ti.App.FACEBOOK_ID;
Titanium.Facebook.permissions = Ti.App.FACEBOOK_PERMISSIONS;
Titanium.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        LoginController.register(Titanium.Facebook.getUid(), loginWindow);
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
        alert("Cancelled");
    }
});

//for IOS
loginWindow.add(view1, logo, loginBtn);
/*FOR ANDROID
view1.add(logo);
view1.add(Titanium.UI.createView({height:"20%"}));
view1.add(loginBtn);
loginWindow.add(view1);*/
