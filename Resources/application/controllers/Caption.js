function Caption(){
	
	this.buttonOkPressed = function(WindowWait, inputText, isFile){

    	if (inputText.value.length == 0){
    		if (isFile) {
    			inputText.value = Ti.App.U_NAME + 's file.';
    		} else {
    			inputText.value = Ti.App.U_NAME + 's pic.';
    		}
    	}
		WindowWait.show();
	}
	
	this.uploadFile = function(WindowWait, inputText, captionWindow, event){
		var nombre = new Date().getTime().toString();        
        var data_to_send = { 
		    "userfile": event.media,
		    "description": inputText.value,
    		"name": nombre,
    		"u_id": Titanium.Facebook.getUid(),
    		"place_id": Ti.App.PLACE_ID
		};
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			WindowWait.hide();
			var dialog = Titanium.UI.createOptionDialog({
		    	options:['Yes', 'No'],
		    	title:'Upload finished. Do you want to share it on Facebook?'
			});
			dialog.show();
			dialog.addEventListener('click', function(e){
				
				if(e.index == 0){
					//FOR IPHONE
					//captionWindow.close();
					WindowWait.show();
					var data_for_facebook = {
						message: 'I just uploaded a file using Spott!',
						picture: event.media,
						application: {
						    name: "Spott", 
						    canvas_name: "Spott", 
						    namespace: "spott_app", 
						    id: "250631718358046"
						}
					};
					Titanium.Facebook.requestWithGraphPath('me/photos', data_for_facebook, 'POST', function(e){
						if (e.success){
							//FOR IPHONE
							//captionWindow.close();
							WindowWait.hide();
							var a = Titanium.UI.createAlertDialog({
							    title:'Success',
							    message:'Sharing complete!',
							    // For ANDROID
							    buttonNames: ['OK']
							});
							a.show();
						} else {
							WindowWait.hide();
							alert("Facebook returned an unknown error");												
						}											
					});
				} /* FOR IPHONE
				else {
					captionWindow.close();
				}*/
			});
		};
		xhr.timeout = Ti.App.TIMEOUT;
		xhr.onerror = function() {
			WindowWait.hide();
			alert("File is taking too long to upload. Retry later.");
		};
		
		xhr.open("POST", Ti.App.SERVER + "/dfiles/receive/1.json");
		xhr.send(data_to_send);
	}
}

module.exports = Caption;