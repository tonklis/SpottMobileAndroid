function Interaction(){
	
	this.display = function(){
		
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Interaction.js"
		});
	}	
}

module.exports = Interaction;
