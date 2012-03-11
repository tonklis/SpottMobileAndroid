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
	actionUI.open();
	loginUI.window().close();
});

actionUI.addEventListener('go_results', function(e) {
	placesUI = Spott.UI.createPlacesUI();
	placesUI.open();

	placesUI.addEventListener('go_download', function(e) {
		downloadUI = Spott.UI.createDownloadUI();
		downloadUI.open();
		
		downloadUI.addEventListener('go_file_download', function(e){
			fileDownloadUI = Spott.UI.createFileDownloadUI();
			fileDownloadUI.open();
			downloadUI.close();
		});
	});
	
	placesUI.addEventListener('go_upload', function(e) {
		uploadUI = Spott.UI.createUploadUI();
		uploadUI.open();
		
		uploadUI.addEventListener('go_file_upload', function(e){
			fileUploadUI = Spott.UI.createFileUploadUI();
			fileUploadUI.open();
			uploadUI.close();
		});
	});
});

loginUI.window().open();