function CaptionWindow(){

	this.captionWindow = Ti.UI.createWindow();
	
	this.Screen = require('ui/Screen');
	this.windowWait = new this.Screen();
	
	this.view1 = Titanium.UI.createView({
			layout: 'vertical',
			backgroundImage: '../../images/fondo.png',
			width: "100%",
			height: "100%"
	});
	
	this.inputLabel = Ti.UI.createLabel({
		text: "Please input your file's description.",
		font: {fontSize:18},
		height: "10%",
		width: "90%",
		top: "5%",
		left: "8%"
	});
	
	this.buttonCancel = Ti.UI.createButton({
		title: "Cancel",
		width: "80%",
		height: "20%",
		top: "75%"
	});
	
	this.inputText = Ti.UI.createTextArea({
		value: "textField",
		width: "80%",
		height: "20%",
		top: "20%",
		borderColor: "black",
		borderRadius: 5,
		borderWidth:1,
		font:{fontSize:16}
	});
	
	this.buttonOk = Ti.UI.createButton({
		title: "Ok", 
		width: "80%",
		height: "20%",
		top: "50%"
	});
    	
    this.captionWindow.add(this.view1);
    this.captionWindow.add(this.inputText);
    this.captionWindow.add(this.buttonOk);
	this.captionWindow.add(this.inputLabel);
	this.captionWindow.add(this.buttonCancel);
	
	this.getWindow = function(){
		return this.captionWindow;
	}
}

module.exports = CaptionWindow;