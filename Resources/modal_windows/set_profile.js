/*
 * TODO
 * Need to test what happens when evalJS errors
 * need to check for never finished loading page before evaljs
 * need to move this all into main chopping js
 * TEST: if touchEnabled: false is set, does evalJS not work?
 */


// Vars
var win = Ti.UI.currentWindow;


var init = function()
{
	win.backgroundColor = "#4B67A1";
	openFacebook(win.data.profilePic);
}


var openFacebook =  function(data)
{
	profilePic = data;
	var URL = 'http://m.facebook.com/photo.php?fbid=' + profilePic + "&prof&refid=13";
	// photo.php?fbid=249663298403678&prof&refid=13
	
    var webView = Ti.UI.createWebView({
    	url: URL,
    	height: 425,
    	bottom: 0,
    	borderWidth: 1,
    	borderColor: '#000'
    });
    win.add(webView);
    
    webView.addEventListener('load', function(e) {
    	Ti.API.log("Page change: " + e.url);
    	if(e.url.indexOf("success=1") != -1) {
    		win.close();
    	} else if(e.url.indexOf("photo.php?fbid=")) {
    		// webView.evalJS("window.scrollBy(0,5000);");
    		// Ti.API.log("Trying to eval JS");
    		webView.evalJS("document.forms[0].submit();");
    		Ti.API.log("Trying to submit form.. this will get me banned");
    	}
    });
    
    
    // scroll down
    var scrollLabel = Ti.UI.createLabel({
    	text: 'Please wait while your profile image is set.',
    	font: {
    		fontSize: 12
    	},
    	top: 10,
    	height: 'auto',
    	width: 300,
    	color: '#fff'
    });
    
    win.add(scrollLabel);
}


init();