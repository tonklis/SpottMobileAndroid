function Upload(){
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Upload.js"
		});
	}
	
	this.camera = function(WindowWait, uploadWindow){
		
		Titanium.Media.showCamera({
			success:function(event)
			{    				
				var input_text = Ti.UI.createTextField();
				input_text.value = Ti.App.U_NAME + "'s pic.";
				var input_dialog  = Ti.UI.createOptionDialog({
				    androidView: input_text,
				    buttonNames:['Cancel','Ok'],
				    title:'Please input your file description.'
				});
				 
				input_dialog.addEventListener('click', function(e) {
				    if (e.index == 1) { 
				    	if (input_text.value.length == 0){
				    		input_text.value = Ti.App.U_NAME + "'s pic.";
				    	}
			    		
			    		WindowWait.show();			    		
			    		
			    		var nombre = new Date().getTime().toString();    
				        var data_to_send = { 
		        		    "userfile": event.media,
		        		    "description": input_text.value,
		            		"name": nombre,
		            		"u_id": Titanium.Facebook.getUid(),
		            		"place_id": Ti.App.PLACE_ID
		        		};
		        		var xhr = Titanium.Network.createHTTPClient();
		        		xhr.onload = function() {
		        			WindowWait.hide();
							var dialog = Titanium.UI.createOptionDialog({
						    	options:['Yes', 'No'],
						    	cancel: 1,
						    	title:'Upload finished. Do you want to share it on Facebook?'
							});
							dialog.show();
							dialog.addEventListener('click', function(e){
								
								if(e.index == 0){	
									WindowWait.show();
									dialog.hide();
									input_dialog.hide();
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
											/*uploadWindow.close();
											this.fireEvent('close_places');*/
											WindowWait.hide();
											alert("Sharing complete!");
										} else {
											WindowWait.hide();
											alert("Facebook returned an unknown error");												
										}											
									});
								}
							});
	        			};
	        			xhr.timeout = Ti.App.TIMEOUT;
	        			xhr.onerror = function() {
	        				WindowWait.hide();
	        				alert("File is taking too long to upload. Retry later.");
	        			};
	        			
	        			xhr.open("POST", Ti.App.SERVER + "/dfiles/receive/1.json");
		       			xhr.send(data_to_send);
				    		
				    } else {
				    	/*uploadWindow.close();
				    	this.fireEvent('close_places');*/
				    }
				});
				
				input_dialog.show();
				       		
			},
    		cancel:function()
    		{
    			WindowWait.hide();
    		},
    		error:function(error)
    		{	
		        var a = Titanium.UI.createAlertDialog({title:'Gallery'});
		        a.setMessage('Unexpected error: ' + error.code);			  
        		a.show();
    		}
		});	
	}
	
	this.picture = function(WindowWait, uploadWindow){
	
		Titanium.Media.openPhotoGallery({
		
    		success:function(event)
    		{
				var input_text = Ti.UI.createTextField();
				input_text.value = Ti.App.U_NAME + "'s file.";
				var input_dialog  = Ti.UI.createOptionDialog({
				    androidView: input_text,
				    buttonNames:['Cancel','Ok'],
				    title:'Please input your file description.'
				});
				input_dialog.addEventListener('click', function(e) {
				    if (e.index == 1) { 
				    	if (input_text.value.length == 0){
				    		input_text.value = Ti.App.U_NAME + "'s file.";
				    	}
			    		WindowWait.show();
			    		
			    		var nombre = new Date().getTime().toString();        
				        var data_to_send = { 
		        		    "userfile": event.media,
		        		    "description": input_text.value,
		            		"name": nombre,
		            		"u_id": Titanium.Facebook.getUid(),
		            		"place_id": Ti.App.PLACE_ID
		        		};
		        		var xhr = Titanium.Network.createHTTPClient();
		        		xhr.onload = function() {
		        			WindowWait.hide();
							var dialog = Titanium.UI.createOptionDialog({
						    	options:['Yes', 'No'],
						    	cancel: 1,
						    	title:'Upload finished. Do you want to share it on Facebook?'
							});
							dialog.show();
							dialog.addEventListener('click', function(e){
								
								if(e.index == 0){	
									WindowWait.show();
									dialog.hide();
									input_dialog.hide();
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
											/*uploadWindow.close();
											this.fireEvent('close_places');*/
											WindowWait.hide();
											alert("Sharing complete!");
										} else {
											WindowWait.hide();
											alert("Facebook returned an unknown error");												
										}											
									});
								}
							});
	        			};
	        			xhr.timeout = Ti.App.TIMEOUT;
	        			xhr.onerror = function() {
	        				WindowWait.hide();
	        				alert("File is taking too long to upload. Retry later.");
	        			};
	        			
	        			xhr.open("POST", Ti.App.SERVER + "/dfiles/receive/1.json");
		       			xhr.send(data_to_send);
				    		
				    } else {
				    	/*uploadWindow.close();
				    	this.fireEvent('close_places');*/
				    }
				});
				
				input_dialog.show();
				       		
			},
    		cancel:function()
    		{
    			WindowWait.hide();
    		},
    		error:function(error)
    		{	
		        var a = Titanium.UI.createAlertDialog({title:'Gallery'});
		        a.setMessage('Unexpected error: ' + error.code);			  
        		a.show();
    		}
		});
	}
	
}

module.exports = Upload;