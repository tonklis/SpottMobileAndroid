function Places(){
	
	var UploadC = require("application/controllers/Upload"), UploadController = new UploadC();
	var DownloadC = require("application/controllers/Download"), DownloadController = new DownloadC();
	var InteractionC = require("application/controllers/Interaction"), InteractionController = new InteractionC();
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Places.js"
		});
	}
	
	this.findOrCreatePlace = function(isUpload, WindowWait){
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			Titanium.UI.createAlertDialog({message:this.error}).show();
			WindowWait.hide();
		};
		xhr.onload = function() {
						
			Ti.App.PLACE_ID = JSON.parse(this.responseText).id;			
			
			if (isUpload){
				var uploadWindow = UploadController.display();
				uploadWindow.addEventListener("android:back", function(e){
					uploadWindow.close();
				});
				uploadWindow.open();	
			} else {				
				var dfiles = JSON.parse(this.responseText).dfiles;
				files = [];
				for (var index in dfiles) {
					files.push({
						//"title": dfiles[index].name,
						"title": dfiles[index].description,
						"location": dfiles[index].location,
						"id": dfiles[index].id,
						"user_id": dfiles[index].user_id
					});
				}
				if (dfiles.length > 0){
					var downloadWindow = DownloadController.display();
					downloadWindow.addEventListener("android:back", function(e){
						downloadWindow.close();
					});
					
					var lista = Titanium.UI.createTableView({
						data: files,
						// FOR ANDROID
						rowHeight: 500,
						top: "11%"
						// FOR IPHONE
						// top: "13%"
					});
					
					lista.addEventListener('click', function(e) {
						var selectionData = e.rowData;
						var view = InteractionController.display();
						var webView = Titanium.UI.createWebView({
							url: Ti.App.SERVER + selectionData.location.replace("public/","/"),
							//FOR ANDROID
							top: "10%"
							//FOR IPHONE
							//top: "12%"
						});
						view.add(webView);
						view.open();
					});
					
					downloadWindow.add(lista);
					downloadWindow.open();
				} else {
					var dialog = Titanium.UI.createOptionDialog({
				    	options:['Yes', 'No'],
				    	title:'No files at this spot! Want to upload one?',
				    	cancel: 1
					});
					dialog.show();
					dialog.addEventListener('click', function(e){						
						if(e.index == 0){
							var uploadWindow = UploadController.display();
							uploadWindow.addEventListener("android:back", function(e){
								uploadWindow.close();
							});
							uploadWindow.open();											
						}
					});
				}				
			}
			WindowWait.hide();
		};
		 
		xhr.open("POST", Ti.App.SERVER + "/places/find_or_create/" + Ti.App.SELECTION_DATA.u_id +".json");
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var params = {  
		    'name':Ti.App.SELECTION_DATA.title,  
		    'latitude':Ti.App.SELECTION_DATA.latitude,
		    'longitude':Ti.App.SELECTION_DATA.longitude,
		    'category':Ti.App.SELECTION_DATA.categoria_id
		}; 
		xhr.send(params);
	}
}

module.exports = Places;