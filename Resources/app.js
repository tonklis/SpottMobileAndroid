var Spott = {};
Ti.include("/src/ui.js");

var loginUI = Spott.UI.createLoginUI();
var actionUI = Spott.UI.createActionUI();
var placesUI;
var uploadUI;
var downloadUI;
var fileDownloadUI;
var fileUploadUI;

loginUI.window().addEventListener('go_home', function(e) {
	actionUI.open({animated:true});
	loginUI.window().close();
});

actionUI.addEventListener('go_results', function(e) {
	
	placesUI = Spott.UI.createPlacesUI();
	placesUI.open({animated:true});

	placesUI.addEventListener('go_download', function(e) {
		downloadUI = Spott.UI.createDownloadUI();
		downloadUI.open({animated:true});
		placesUI.close();
		
		downloadUI.addEventListener('go_file_download', function(e){
			fileDownloadUI = Spott.UI.createFileDownloadUI();
			fileDownloadUI.open({animated:true});
			downloadUI.close();
		});
	});
	
	placesUI.addEventListener('go_upload', function(e) {
		uploadUI = Spott.UI.createUploadUI();
		uploadUI.open({animated:true});
		placesUI.close();
		
		uploadUI.addEventListener('go_file_upload', function(e){
			fileUploadUI = Spott.UI.createFileUploadUI();
			fileUploadUI.open({animated:true});
			uploadUI.close();
		});
	});
	actionUI.close();
});

loginUI.window().open({animated:true});