Ti.include('/library/frames.js');

var win = Ti.UI.currentWindow;
var progressBar;

var overlay;
var cameraTransform;

var curImageProcessed;

var init = function()
{
	curImageProcessed = 0;
	
	progressBar = Ti.UI.createProgressBar({
		width: 200,
		min: 0,
		max: 6,
		value: 0,
		height: 70,
		color: '#fff',
		message: 'Processing Image ' + curImageProcessed + ' of 6',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		},
		style: Ti.UI.iPhone.ProgressBarStyle.PLAIN,
		top: 200
	});
	
	
	setTimeout(function() {
		win.add(progressBar);
		progressBar.value = 0;
		progressBar.show();
		win.backgroundColor = "#4B67A1";
	}, 1500);
	
	
	
	Ti.App.addEventListener("photoProcessed", function() {
		progressBar.value = ++curImageProcessed;
		progressBar.message = "Processing Image " + curImageProcessed + " of 6";
	});
	
	Ti.App.addEventListener("profilePic", function(event) {
		openFacebook(event);
	});
	
	Ti.App.addEventListener("finishedUploading", function() {
		if(!profilePic) {
			win.close();
		}
	});
	
	cameraTransform = Ti.UI.create2DMatrix();
	
	overlay = Ti.UI.createView({
		touchEnabled: false
	});
	
	var imageOverlay = Ti.UI.createImageView({
		width: 320,
		image: '/images/new_overlay.png',
		height: 441,
		left: 0,
		top: 1,
		touchEnabled: false
	});
	overlay.add(imageOverlay);
	
	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			// set image view
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				createFullFrame(event.media);
				alert(event.media);
			}
			else
			{
				alert("for some reason the photo gallery failed!" + event);
			}
		},
		cancel:function()
		{
			win.close();
		},
		error:function(error)
		{
			alert("Could not open gallery: " + e);
		},
		allowEditing: false,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
	});
}


var openFacebook =  function(data)
{
	profilePic = data.profilePic;
	var URL = 'http://m.facebook.com/photo.php?fbid=' + profilePic;
	
    var webView = Ti.UI.createWebView({
    	url: URL,
    	height: 360,
    	bottom: 0,
    	borderWidth: 1,
    	borderColor: '#000'
    });
    win.add(webView);
    
    
    // scroll down
    var scrollLabel = Ti.UI.createLabel({
    	text: 'Scroll to the bottom of the page and tap the "make profile pic" then click "Confirm". When finished, click the "I\'m Done" button',
    	font: {
    		fontSize: 12
    	},
    	top: 10,
    	height: 'auto',
    	width: 300,
    	color: '#fff'
    });
    
    win.add(scrollLabel);
    
    var finishedButton = Ti.UI.createButton({
    	title: 'I\'m Finished!',
    	width: 100,
    	height: 20,
    	font: {
    		fontSize: 12
    	},
    	top: 60
    });
    
	win.add(finishedButton);
	
	finishedButton.addEventListener("click", function() {
		win.close();
	});
}

init();
