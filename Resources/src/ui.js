/**
 * @author Benjamin
 */
(function() {
	Spott.UI = {};
	SERVER = "http://108.166.90.25:3000";
	var foursquareClient = 'R34PNLK00FEDEFX54LIZDOC51QUOJGPKHJUVNJVCDV42YON2';
	var foursquareSecret = 'MJCYCVNYJ1HYYK05ZFBE3NJ511FRS0L24F2YWRQC43RGYXDJ';
	var places = [];
	var files = [];
	var radius = 500;
	var upload;
	var selectionData;
	var u_id;
	var place_id;
	
	Spott.UI.createLoginUI = function() {
		var window = Titanium.UI.createWindow({
			layout: 'vertical',
			backgroundColor: '#000000',
			fullscreen: true,
			navBarHidden: true
		});
		
		Titanium.Facebook.appid = ['250631718358046'];
		Titanium.Facebook.permissions = ['publish_stream','email','user_activities','user_interests','user_likes','user_birthday', 'offline_access']; // Permissions your app needs
		Titanium.Facebook.addEventListener('login', function(e) {
		    if (e.success) {
		        isRegistered(Titanium.Facebook.getUid(), window);
		    } else if (e.error) {
		        alert(e.error);
		    } else if (e.cancelled) {
		        alert("Cancelled");
		    }
		});
		
		if (!Titanium.Facebook.getLoggedIn()) {
			var view1 = Titanium.UI.createView({
				layout: 'vertical',
				backgroundImage: '../images/fondoConLogo.png',
				width: 480,
				height: 800
			});
			view1.add(Titanium.UI.createView({height:400}));
			
			var loginBtn = Titanium.UI.createButton({
				backgroundImage: '../images/fb-connect-large.png',
				width: 300,
				height: 50
			});
			loginBtn.addEventListener('click', function(e){
				Titanium.Facebook.authorize();
			});
			view1.add(loginBtn);
			
			window.add(view1);
		}
		else {
			isRegistered(Titanium.Facebook.getUid(), window);
		}
		return {
			window: function() {
				return window;
			},
			accessToken: function() {
				return Titanium.Facebook.getAccessToken();
			}
		}
	}
	
	function isRegistered(uid, window) {
		u_id = uid;
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			Titanium.UI.createAlertDialog({message:this.error}).show();
		};
		xhr.onload = function() {
			window.fireEvent('go_home'); //quitar
		};
		xhr.timeout = 5000;
		 
		xhr.open("GET",SERVER + "/users/find_or_create/" + uid +".json");
		xhr.send(); 
	}
	
	function callFoursquare(window){
		activity = windowWait(window);
		activity.show();
		var saveRequest = Titanium.Network.createHTTPClient();
		saveRequest.onload = function() {
			places = [];
			var foursquareData = JSON.parse(this.responseText).response.groups[0].items;
			for (var index in foursquareData) {
				places.push({
					"title":foursquareData[index].venue.name,
					"color": "#000000", 
					"distancia":foursquareData[index].venue.location.distance, 
					"categoria":foursquareData[index].venue.categories[0].name,
					"categoria_id":foursquareData[index].venue.categories[0].id,
					"latitude":foursquareData[index].venue.location.lat,
					"longitude":foursquareData[index].venue.location.lng,
					"u_id":foursquareData[index].venue.id
				});
			}
			activity.hide();
			window.fireEvent('go_results');
		};
		
		// NYC
		lat = 40.7;
		lng = -74;
		saveRequest.open("GET","https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=" + radius + "&client_id=" + foursquareClient + "&client_secret=" + foursquareSecret + "&v=20120215" );
		//saveRequest.setRequestHeader("Content-Type","application/json; charset=utf-8");
		saveRequest.send();
		
		/*Titanium.Geolocation.getCurrentPosition(function(ll) {
			var lat = ll.coords.latitude;
			var lng = ll.coords.longitude;
			saveRequest.open("GET","https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=" + radius + "&client_id=" + foursquareClient + "&client_secret=" + foursquareSecret + "&v=20120215" );
			//saveRequest.setRequestHeader("Content-Type","application/json; charset=utf-8");
			saveRequest.send();	    	
		});*/
	}
	
	Spott.UI.createActionUI = function() {
		
		var uploadButton = Titanium.UI.createButton({
			backgroundImage: '../images/botonSubida.png',
			backgroundSelectedImage: '../images/botonSubidaPicado.png',
			width: 384,
			height: 149,
			
		});
		var downloadButton = Titanium.UI.createButton({
			backgroundImage: '../images/botonDescarga.png',
			backgroundSelectedImage: '../images/botonDescargaPicado.png',
			width: 384,
			height: 149
		});
		uploadButton.addEventListener('click', function(e) {
			upload = true;
			callFoursquare(window);
		});
		
		downloadButton.addEventListener('click', function(e) {
			upload = false;
			callFoursquare(window);
		});
		
		var window = Titanium.UI.createWindow({
			title: 'Share or Spott?',
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			fullscreen: true,
			navBarHidden: true
		});
		
		var view1 = Titanium.UI.createView({
				layout: 'vertical',
				backgroundImage: '../images/fondoConLogo.png',
				width: 480,
				height: 800
			});
		view1.add(Titanium.UI.createView({height:350}));
		
		
		view1.add(uploadButton);
		view1.add(Titanium.UI.createView({height:30}));
		view1.add(downloadButton);
		
		window.add(view1);
		return window;
	}
	
	Spott.UI.createPlacesUI = function() {

		var window = Titanium.UI.createWindow({
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			fullscreen: true,
			navBarHidden: true
		});
		
		var barra = Titanium.UI.createImageView({
			url: '../images/barraPlaces.png'
		});
		
		var botonAtras = Titanium.UI.createButton({
			backgroundImage: '../images/botonAtras.png',
			backgroundSelectedImage: '../images/botonAtrasPicado.png',
			width: 68,
			height: 42,
			top: -66,
			left: 10
		});
		
		botonAtras.addEventListener('click',function(e){
			window.close();
		});
		
		//var view1 = Titanium.UI.createView({layout:'vertical'});
		var lista = Titanium.UI.createTableView({
			data: places,
			rowHeight: 500,
			top: 24
		});
		
		lista.addEventListener('click', function(e) {
			selectionData = e.rowData;
			if (upload){
				window.fireEvent('go_upload');
			} else {
				window.fireEvent('go_download');
			}
		});
		window.add(barra);
		window.add(botonAtras);
		window.add(lista);
		return window;
	}
	
	Spott.UI.createUploadUI = function() {
		var window = Titanium.UI.createWindow({
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			fullscreen: true,
			navBarHidden: true
		});
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			Titanium.UI.createAlertDialog({message:this.error}).show();
		};
		xhr.onload = function() {
						
			place_id = JSON.parse(this.responseText).id;
			window.fireEvent('go_file_upload');			
		};
		 
		xhr.open("POST", SERVER + "/places/find_or_create/" + selectionData.u_id +".json");
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var params = {  
		    'name':selectionData.title,  
		    'latitude':selectionData.latitude,
		    'longitude':selectionData.longitude,
		    'category':selectionData.categoria_id
		}; 
		xhr.send(params); 
		return window;
	}
	
	Spott.UI.createFileUploadUI = function() {
		var window = Titanium.UI.createWindow({
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			fullscreen: true,
			navBarHidden: true
		});

		var cameraButton = Titanium.UI.createButton({
			backgroundImage: '../images/botonGaleria.png',
			width: 140,
			height: 125,
			top: -120
		});
		
		var barraArchivos = Titanium.UI.createImageView({
			url: '../images/barraFiles.png',
			height: 90,
			width: 480,
		});
		
		
		var botonBack = Titanium.UI.createButton({
			backgroundImage: '../images/botonAtras.png',
			backgroundSelectedImage: '../images/botonAtrasPicado.png',
			width: 68,
			height: 42,
			top: -66,
			left: 10
		});
		
		botonBack.addEventListener('click', function(e){
			window.close();
		});
		
		var view1 = Titanium.UI.createView({
				layout: 'vertical',
				backgroundImage: '../images/fondo.png',
				width: 480,
				height: 800
		});
		
		var logo = Titanium.UI.createImageView({
			url: '../images/logoChico.png',
			top: 34
		});
		
		view1.add(barraArchivos);
		view1.add(botonBack);
		view1.add(logo);
		view1.add(Titanium.UI.createView({height:350}));
		view1.add(cameraButton);
		
		cameraButton.addEventListener('click', function() {
			activity = windowWait(window);
			activity.show();
			
			Titanium.Media.openPhotoGallery({
		
    			success:function(event)
    			{
    				var nombre = new Date().getTime().toString();
	        
			        var data_to_send = { 
	        		    "userfile": event.media, 
	            		"name": nombre+'.jpg',
	            		"u_id": u_id,
	            		"place_id": place_id
	        		};
	        		var xhr = Titanium.Network.createHTTPClient();
	        		xhr.onload = function() {
	        			activity.hide();
						var dialog = Titanium.UI.createOptionDialog({
					    	options:['Yes', 'No'],
					    	cancel: 0,
					    	title:'File upload finished. Do you want to upload another one?'
						});
						dialog.show();
						dialog.addEventListener('click', function(e){
							
							if(e.index == 1){		
								actionUI = Spott.UI.createActionUI();
								actionUI.addEventListener('go_results', function(e) {
									placesUI = Spott.UI.createPlacesUI();
									placesUI.open({animated:true});
								
									placesUI.addEventListener('go_download', function(e) {
										downloadUI = Spott.UI.createDownloadUI();
										downloadUI.open({animated:true});
										//placesUI.close();
										
										downloadUI.addEventListener('go_file_download', function(e){
											fileDownloadUI = Spott.UI.createFileDownloadUI();
											fileDownloadUI.open({animated:true});
											//downloadUI.close();
										});
									});
									
									placesUI.addEventListener('go_upload', function(e) {
										uploadUI = Spott.UI.createUploadUI();
										uploadUI.open({animated:true});
										//placesUI.close();
										
										uploadUI.addEventListener('go_file_upload', function(e){
											fileUploadUI = Spott.UI.createFileUploadUI();
											fileUploadUI.open({animated:true});
											//uploadUI.close();
										});
									});
									
									//actionUI.close();
								});								
								actionUI.open({animated:true});															
								window.close();
							}
						});
        			};
        			
	        		xhr.open("POST",SERVER + "/dfiles/receive/1.json");
	       			xhr.send(data_to_send);        		
	        		
    			},
	    		cancel:function()
	    		{
	    		},
	    		error:function(error)
	    		{	
			        var a = Titanium.UI.createAlertDialog({title:'Gallery'});
			        a.setMessage('Unexpected error: ' + error.code);			  
	        		a.show();
	    		},
			});	
		});
		window.add(view1);
		return window;
	}
	
	Spott.UI.createDownloadUI = function() {
		var window = Titanium.UI.createWindow({
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			fullscreen: true,
			navBarHidden: true
		});
		
		activity = windowWait(window);
		activity.show();
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			Titanium.UI.createAlertDialog({message:this.error}).show();
		};
		xhr.onload = function() {
			var dfiles = JSON.parse(this.responseText).dfiles;
			place_id = JSON.parse(this.responseText).id;
			activity.hide();
			files = [];
			for (var index in dfiles) {
				files.push({
					"title": dfiles[index].name,
					"location": dfiles[index].location,
					"id": dfiles[index].id,
					"user_id": dfiles[index].user_id
				});
			}
			if (dfiles.length > 0){
				window.fireEvent('go_file_download');
			} else {
				var dialog = Titanium.UI.createOptionDialog({
			    	options:['Yes', 'No'],
			    	title:'No files at this spot! Want to upload one?'
				});
				dialog.show();
				dialog.addEventListener('click', function(e){
					
					if(e.index == 0){
						fileUploadUI = Spott.UI.createFileUploadUI();
						fileUploadUI.open({animated:true});
					} else {
						window.close();
					}
				});
			}	
		};
		 
		xhr.open("POST", SERVER + "/places/find_or_create/" + selectionData.u_id +".json");
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var params = {  
		    'name':selectionData.title,  
		    'latitude':selectionData.latitude,
		    'longitude':selectionData.longitude,
		    'category':selectionData.categoria_id
		}; 
		xhr.send(params);		
		return window;
	}
	
	Spott.UI.createFileDownloadUI = function() {
		var window = Titanium.UI.createWindow({
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			fullscreen: true,
			navBarHidden: true
		});	
		
		var lista = Titanium.UI.createTableView({
			data: files,
			rowHeight: 500,
			top: 24
		});
		
		lista.addEventListener('click', function(e) {
			selectionData = e.rowData;
			var webview = Titanium.UI.createWebView({url: SERVER + "/data/" + selectionData.title});
			var window_2 = Titanium.UI.createWindow(); window_2.add(webview); window_2.open({modal:true});
		});
		
		var barraArchivos = Titanium.UI.createImageView({
			url: '../images/barraFiles.png',
			height: 90,
			width: 480,
		});
		
		
		var botonBack = Titanium.UI.createButton({
			backgroundImage: '../images/botonAtras.png',
			backgroundSelectedImage: '../images/botonAtrasPicado.png',
			width: 68,
			height: 42,
			top: -66,
			left: 10
		});
		
		botonBack.addEventListener('click', function(e){
			window.close();
		});
		
		window.add(barraArchivos);
		window.add(botonBack);
		window.add(lista);
		
		return window;
	}
	
	function windowWait(window) {

		var isControlsCreated = false;
		var view1, view2, indicator;
	
		function createControls(){
			if (isControlsCreated) {return;}
	
			view1 = Ti.UI.createView({
				height:'100%',
				width:'100%',
				backgroundColor:'#000',
				opacity:0.5,
				zIndex:8
			});
			view1.hide();
			window.add(view1);
	
			view2 = Ti.UI.createView({
				height:'100%',
				width:'100%',
				zIndex:9
			});
			view2.hide();
			window.add(view2);
	
			indicator = Titanium.UI.createActivityIndicator({
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
				font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
				color:'#fff',
				message:'Loading...',
				height:'100%',
				width:'auto'
			});
			view2.add(indicator);
	
			isControlsCreated = true;
		}
	
		//
		// Public methods stored in api
		//
	
		var api = {};
	
		api.show = function(message){
			createControls();
	
			if (message) {indicator.message = message;}
			else {indicator.message = 'Loading...';}
	
			view1.show();
			view2.show();
			indicator.show();
		};
	
		api.hide = function(){
			createControls();
	
			view1.hide();
			view2.hide();
			indicator.hide();
		};
	
		return api;
	};
	
})();
