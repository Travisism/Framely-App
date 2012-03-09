/* TODO:
 * 
 */

var win = Ti.UI.currentWindow;


// Display Vars
var step1Label;
var step2Label;

// Facebook
var fbLogin;
var firstName;
var firstNameLabel;

// Buttons
var cameraButton;

// Windows
var camWindow;

// Welcome window
var welcomeWindow;
var welcomeMessage;
var welcomeOpen = false;



function init()
{	
	/*
	win.addEventListener('focus', function(event) {
		if(!welcomeOpen) {
			openWelcomeWindow();
		}
	});
	*/
	
	win.backgroundImage = '/images/bg.png';
	
	Titanium.Facebook.addEventListener('login', function(e) {
		
	    if (e.success) {
	    	if(!firstName) {
	    	
		    	// Make a call to get the users name
		    	Titanium.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		    		
				    if (e.success) {
				        
				        var json = JSON.parse(e.result);
				        
				        firstNameLabel = Ti.UI.createLabel({
				        	text: "Hello, " + json.first_name,
				        	width: 'auto',
				        	height: 20,
				        	top: 32,
				        	left: 20
				        });
				        
				        win.remove(welcomeWindow);
				        win.add(firstNameLabel);
				        welcomeOpen = false;
				        
				    } else if (e.error) {
				        alert(e.error);
				    } else {
				        alert('Unknown response');
				    }
				});
			}
	    	
	    } else if (e.error) {
	        alert(e.error);
	    }
	    
	});
	
	if(!Ti.Facebook.loggedIn) {
		if(!welcomeOpen) {
			openWelcomeWindow();
		}
	}
	
	Ti.Facebook.addEventListener('logout', function(e) {
		if(!welcomeOpen) {
			openWelcomeWindow();
		}
	});
}

var openWelcomeWindow = function()
{
	welcomeOpen = true;
	
	welcomeWindow = Ti.UI.createView({
    	width: 250,
    	height: 180,
    	borderRadius: 10,
    	backgroundColor: '#000',
    	opacity: 0.8,
    	touchEnabled: true,
    	top: 77
    });
    
    welcomeMessage = Ti.UI.createLabel({
    	text: 'Welcome to Framely!\nThe awesomest way to customize your facebook\n\nPlease log in to your facebook account to continue.',
    	color: '#fff',
    	width: 230,
    	top: 10,
    	height: 'auto',
    	opacity: 1,
    	font: {
    		fontFamily: 'Helvetica Neue',
    		fontSize: 15
    	}
    });
    welcomeWindow.add(welcomeMessage);
    
    fbLogin = Ti.Facebook.createLoginButton({
		bottom: 10,
	});
	welcomeWindow.add(fbLogin);
    
    win.add(welcomeWindow);
}





init();
