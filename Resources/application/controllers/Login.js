function Login(){
	var HomeC = require("application/controllers/Home"), HomeController = new HomeC();
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Login.js"
		});
	}
	
	this.authorize = function(){
		Titanium.Facebook.authorize();
	}
	
	this.register = function (uid, windowToClose) {
		
		this.getUName();
		this.registerWithBackend(uid, windowToClose);
		
	}
	
	this.getUName = function() {
		Titanium.Facebook.requestWithGraphPath('me', {}, "GET", function(e) {
		    if (e.success) {
		        Ti.App.U_NAME = JSON.parse(e.result).first_name;
		    } else {
		        if (e.error) {
		            alert("Error connecting with Facebook.");
		        } else {
		            alert("Unkown result from Facebook.");
		        }
		    }
		});
	}
	
	this.registerWithBackend = function(uid, windowToClose){
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			var alertDialog = Titanium.UI.createAlertDialog({ title: 'Spott is taking too long to reply.', 
				message: 'Please try again later.', buttonNames: ['OK'] });
			alertDialog.show();
		};
		xhr.onload = function() {
			if (windowToClose != null){				
				HomeController.display().open();
				//FOR ANDROID
				windowToClose.close();				
			}					
		};
		xhr.timeout = Ti.App.TIMEOUT;
		 
		xhr.open("GET", Ti.App.SERVER + "/users/find_or_create/" + uid +".json");
		xhr.send();	
	}
}

module.exports = Login;