function Home(){
	
	var PlacesC = require("application/controllers/Places"), PlacesController = new PlacesC();
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			exitOnClose:true,
			url: "application/views/Home.js"
		});
	}
	
	this.upload = function(WindowWait){
		WindowWait.show();
		this.callFoursquare(WindowWait);
		Ti.App.UPLOAD = true;
	}
	
	this.download = function(WindowWait){
		WindowWait.show();
		this.callFoursquare(WindowWait);
		Ti.App.UPLOAD = false;
	}
	
	this.callFoursquare = function (WindowWait){
		var saveRequest = Titanium.Network.createHTTPClient();
		saveRequest.onload = function() {
			var foursquareData = JSON.parse(this.responseText).response.groups[0].items;
			Ti.App.PLACES = [];
			for (var index in foursquareData) {
				Ti.App.PLACES.push({
					"title":foursquareData[index].venue.name,
					"color": "#000000", 
					"distancia":foursquareData[index].venue.location.distance, 
					"categoria":foursquareData[index].venue.categories[0].name,
					"imagen": foursquareData[index].venue.categories[0].icon.prefix + "44.png",
					"categoria_id":foursquareData[index].venue.categories[0].id,
					"latitude":foursquareData[index].venue.location.lat,
					"longitude":foursquareData[index].venue.location.lng,
					"u_id":foursquareData[index].venue.id
				});
			}
			WindowWait.hide();
			
			var placesWindow = PlacesController.display();
			placesWindow.addEventListener("android:back", function(e){
				placesWindow.close();
			});
			placesWindow.open();
			
		};
		saveRequest.onerror = function(){
			WindowWait.hide();
			alert("Query is taking too long to perform. Retry later.");
		}
		
		saveRequest.timeout = Ti.App.TIMEOUT;
		// NYC
		/*lat = 40.7;
		lng = -74;
		saveRequest.open("GET","https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=" + Ti.App.RADIUS + "&client_id=" + Ti.App.FOURSQUARE_CLIENT + "&client_secret=" + Ti.App.FOURSQUARE_SECRET + "&v=20120215" );
		//saveRequest.setRequestHeader("Content-Type","application/json; charset=utf-8");
		saveRequest.send();*/
		
		Titanium.Geolocation.getCurrentPosition(function(ll) {
			var lat = ll.coords.latitude;
			var lng = ll.coords.longitude;
			saveRequest.open("GET","https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=" + Ti.App.RADIUS + "&client_id=" + Ti.App.FOURSQUARE_CLIENT + "&client_secret=" + Ti.App.FOURSQUARE_SECRET + "&v=20120215" );
			//saveRequest.setRequestHeader("Content-Type","application/json; charset=utf-8");
			saveRequest.send();	    	
		});
	}
}

module.exports = Home;