function Home(){
	
	var PlacesC = require("application/controllers/Places"), PlacesController = new PlacesC();
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			exitOnClose:true,
			url: "/application/views/Home.js"
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
			arreglo = [];
			for (var index in foursquareData) {
				arreglo.push({
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
			
			if(arreglo.length > 0){
				var lista = Titanium.UI.createTableView({
					data: arreglo,
					//FOR ANDROID
					rowHeight: 500,
					top: "11%"
					//FOR IPHONE
					//top: "13%"
				});
				
				lista.addEventListener('click', function(e) {
					WindowWait.show();
					Ti.App.SELECTION_DATA = e.rowData;
					PlacesController.findOrCreatePlace(Ti.App.UPLOAD, WindowWait);
				});
				
				placesWindow.add(lista);
			}else{
				var noPlaces = Titanium.UI.createImageView({
					image: '../../images/noPlaces.png',
					width: "85%"
				});
				
				placesWindow.add(Titanium.UI.createView({height:"10%"}));
				placesWindow.add(noPlaces);			
			}
			
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
		
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = 50;
		Titanium.Geolocation.getCurrentPosition(function(ll) {

			if(ll.error){
				WindowWait.hide();
				/* FOR IPHONE
				var dialog = Titanium.UI.createAlertDialog({
				    title:'Reinstall Spott',
				    message:'Please allow your GPS to be used by Spott.'
				});
				dialog.show(); */
				//	FOR ANDROID
				var dialog = Titanium.UI.createOptionDialog({
			    	options:['Yes', 'No'],
			    	title:'Please allow your GPS to be used by Spott to continue.',
			    	cancel: 1
				});
				dialog.show();
				dialog.addEventListener('click', function(e){
					if(e.index == 0){
						Titanium.Geolocation.addEventListener('location', function(e) {	});												
					}
				});
			}else{
				var lat = ll.coords.latitude;
				var lng = ll.coords.longitude;
				saveRequest.open("GET","https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=" + Ti.App.RADIUS + "&client_id=" + Ti.App.FOURSQUARE_CLIENT + "&client_secret=" + Ti.App.FOURSQUARE_SECRET + "&v=20120215" );
				//saveRequest.setRequestHeader("Content-Type","application/json; charset=utf-8");
				saveRequest.send();	
			}
		});
	}
}

module.exports = Home;