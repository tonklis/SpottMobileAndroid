/*
 * Punto de entrada. Siguiendo el template de single window.
 * 
 * por: Benjamín Hernández
 */
Ti.App.SERVER = "http://108.166.90.25";
Ti.App.FOURSQUARE_CLIENT = "R34PNLK00FEDEFX54LIZDOC51QUOJGPKHJUVNJVCDV42YON2";
Ti.App.FOURSQUARE_SECRET = "MJCYCVNYJ1HYYK05ZFBE3NJ511FRS0L24F2YWRQC43RGYXDJ";
Ti.App.FACEBOOK_ID = "250631718358046";
Ti.App.FACEBOOK_PERMISSIONS = ['publish_stream','email', 'offline_access'];
Ti.App.TIMEOUT = 90000;
Ti.App.U_NAME = "";
Ti.App.RADIUS = 500;
Ti.App.PLACES = [];
Ti.App.UPLOAD;
Ti.App.SELECTION_DATA;
Ti.App.PLACE_ID;
Ti.App.FILES = [];

var ApplicationWindow = require('ui/ApplicationWindow');
new ApplicationWindow().open();
