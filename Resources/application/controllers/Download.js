function Download(){
	
	this.display = function(){
		return Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			url: "/application/views/Download.js"
		});
	}
}

module.exports = Download;