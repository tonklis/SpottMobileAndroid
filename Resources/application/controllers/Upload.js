function Upload(){
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Upload.js"
		});
	}
	
	this.camera = function(uploadWindow){

		Titanium.Media.showCamera({
			success:function(event)
			{
				var CaptionWindowRequire = require("application/views/Caption");
				var captionInstance = new CaptionWindowRequire();
				
				var CaptionC = require("application/controllers/Caption");
				var CaptionController = new CaptionC();
				
				var captionWindow = captionInstance.getWindow();
				captionInstance.inputText.value = Ti.App.U_NAME + "'s pic.";
				captionInstance.buttonCancel.addEventListener('click', function(){
					captionWindow.close();
				});
				captionInstance.buttonOk.addEventListener('click', function(){
					CaptionController.buttonOkPressed(captionInstance.windowWait, captionInstance.inputText, true);
					CaptionController.uploadFile(captionInstance.windowWait, captionInstance.inputText, captionWindow, event);
					captionWindow.close();
				});
				captionWindow.open();
				       		
			},
    		cancel:function()
    		{
    			//WindowWait.hide();
    		},
    		error:function(error)
    		{	
		        var a = Titanium.UI.createAlertDialog({title:'Gallery'});
		        a.setMessage('Unexpected error: ' + error.code);			  
        		a.show();
    		}
		});	
	}
	
	this.picture = function(uploadWindow){
	
		Titanium.Media.openPhotoGallery({		
    		success:function(event)
    		{
    			var CaptionWindowRequire = require("application/views/Caption");
				var captionInstance = new CaptionWindowRequire();
				
				var CaptionC = require("application/controllers/Caption");
				var CaptionController = new CaptionC();
				
				var captionWindow = captionInstance.getWindow();
				captionInstance.inputText.value = Ti.App.U_NAME + "'s file.";
				captionInstance.buttonCancel.addEventListener('click', function(){
					captionWindow.close();
				});
				captionInstance.buttonOk.addEventListener('click', function(){
					CaptionController.buttonOkPressed(captionInstance.windowWait, captionInstance.inputText, true);
					CaptionController.uploadFile(captionInstance.windowWait, captionInstance.inputText, captionWindow, event);
					captionWindow.close();
				});
				captionWindow.open();
			},
    		cancel:function()
    		{
    			//WindowWait.hide();
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