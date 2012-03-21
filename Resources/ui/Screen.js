function WindowWait() {
 
    var isControlsCreated = false;
    var view1, view2, indicator;
    var countdown = 0;
 
    function createControls(){
        if (isControlsCreated) {return;}
 
        view1 = Ti.UI.createView({
            height:'100%',
            width:'100%',
            backgroundColor:'#000',
            opacity:0.5,
            zIndex:8
        });
        view1.hide();
        Ti.UI.currentWindow.add(view1);
 
        view2 = Ti.UI.createView({
            height:'100%',
            width:'100%',
            zIndex:9
        });
        view2.hide();
        Ti.UI.currentWindow.add(view2);
 
        indicator = Ti.UI.createActivityIndicator({
            font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
            color:'#fff',
            message:'Loading...',
            height:'100%',
            width:'auto'
        });
        view2.add(indicator);
 
        isControlsCreated = true;
    }
 
    var api = {};
 
    api.show = function(message){
        createControls();
 
        if (message) {indicator.message = message;}
        else {indicator.message = 'Loading...';}
 
        view1.show();
        view2.show();
        api.timer();
        indicator.show();
    };
 
    api.timer = function(){
        countdown = 120;
        var countdownSeconds = setInterval(function() {
            Ti.API.info('Timer: '+countdown);
            countdown = countdown -1;
            if (countdown <0) {
                clearInterval(countdownSeconds);
                api.hide();
            }
        },1000);
    }
    api.hide = function(){
        countdown = 0;
        createControls();
 
        view1.hide();
        view2.hide();
        indicator.hide();
    };
 
    return api;
}

module.exports = WindowWait;

