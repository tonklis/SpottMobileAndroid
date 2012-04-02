function Upload(){
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Upload.js"
		});
	}
	
	//For Android
	this.camera = function(WindowWait, uploadWindow){
	//For IPHONE
	//this.camera = function(uploadWindow){

		Titanium.Media.showCamera({
			success:function(event)
			{
				var CaptionC = require("application/controllers/Caption");
				var CaptionController = new CaptionC();
				// FOR ANDROID
				var inputText = Ti.UI.createTextField();
				inputText.value = Ti.App.U_NAME + "'s pic.";
				var inputDialog  = Ti.UI.createOptionDialog({
				    androidView: inputText,
				    buttonNames:['Cancel','Ok'],
				    title:"Please input your file's description."
				});
				
				inputDialog.addEventListener('click', function(e) {
					if (e.index == 1){
						CaptionController.buttonOkPressed(WindowWait, inputText, true);
						CaptionController.uploadFile(WindowWait, inputText, inputDialog, event);
					}
				});
				
				inputDialog.show();
				
				/* FOR IPHONE
				var CaptionWindowRequire = require("application/views/Caption");
				var captionInstance = new CaptionWindowRequire();
				
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
				*/
			},
    		cancel:function()
    		{
    			//WindowWait.hide();
    		},
    		error:function(error)
    		{	
		        var a = Titanium.UI.createAlertDialog({title:'Picture'});
		        a.setMessage('Unexpected error: ' + error.code);			  
        		a.show();
    		}
		});	
	}
	
	//For Android
	this.picture = function(WindowWait, uploadWindow){
	//For IPHONE
	//this.picture = function(uploadWindow){
	
		Titanium.Media.openPhotoGallery({		
    		success:function(event)
    		{
				var CaptionC = require("application/controllers/Caption");
				var CaptionController = new CaptionC();
				
				// FOR ANDROID
				var inputText = Ti.UI.createTextField();
				inputText.value = Ti.App.U_NAME + "'s file.";
				var inputDialog  = Ti.UI.createOptionDialog({
				    androidView: inputText,
				    buttonNames:['Cancel','Ok'],
				    title: "Please input your file's description."
				});
				
				inputDialog.addEventListener('click', function(e) {
					if (e.index == 1){
						CaptionController.buttonOkPressed(WindowWait, inputText, false);
						CaptionController.uploadFile(WindowWait, inputText, inputDialog, event);
					}
				});
				
				inputDialog.show();
    			
    			/* FOR IPHONE
    			var CaptionWindowRequire = require("application/views/Caption");
				var captionInstance = new CaptionWindowRequire();
				
				
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
				captionWindow.open();*/
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