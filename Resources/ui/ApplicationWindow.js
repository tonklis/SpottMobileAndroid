function ApplicationWindow() {
	var LoginC = require("application/controllers/Login"), LoginController = new LoginC();
	
	if (Titanium.Facebook.getLoggedIn()) {		
		var HomeC = require("application/controllers/Home"), HomeController = new HomeC();
		
		LoginController.register(Titanium.Facebook.getUid(), null);
		return  HomeController.display();
	} else {
		return LoginController.display();
	}
}

module.exports = ApplicationWindow;