Ti.include('/library/frames.js');

// Vars
var win = Ti.UI.currentWindow;
var cameraTransform;
var cameraButton;
var overlay;
var progressBar;

var curImageProcessed;

var profilePic;

var init = function()
{
	createOverlay();
	
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
	
	openCamera();
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


function openCamera()
{
	Titanium.Media.showCamera({
		success:function(event)
		{
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				createFullFrame(event.media);
				
				Ti.Media.hideCamera();
			} else {
				alert("Wrong type: " + event.mediaType);
			}
		}, 
		cancel: function()
		{
			win.close();
		},
		error: function(error)
		{
			createFullFrame('/images/size_template_giant.png');
		},
		saveToPhotoGallery: false,
		allowEditing: false,
		overlay: overlay,
		transform: cameraTransform,
		autohide: true,
		showControls: false,
		animate: false,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}


var createOverlay = function()
{
	cameraTransform = Ti.UI.create2DMatrix();
	
	overlay = Ti.UI.createView({
		touchEnabled: true
	});
	
	var imageOverlay = Ti.UI.createImageView({
		width: 320,
		image: '/images/new_overlay.png',
		height: 441,
		left: 0,
		top: 1,
		touchEnabled: false
	});
	
	var bottomBar = Ti.UI.createImageView({
		bottom: 0,
		left: 0,
		image: '/images/camera_bottom.png',
		width: 320,
		height: 53
	});
	
	var camButton = Ti.UI.createButton({
		width: 99,
		height: 53,
		backgroundImage: '/images/camera_button.png',
		backgroundSelectedImage: '/images/camera_button_pressed.png',
		bottom: 0
	});
	
	var cancelButton = Ti.UI.createButton({
		width: 54,
		height: 53,
		backgroundImage: '/images/cancel_button.png',
		backgroundSelectedImage: '/images/cancel_button_pressed.png',
		bottom: 0,
		left: 9
	});
	
	
	overlay.add(imageOverlay);
	overlay.add(bottomBar);
	overlay.add(camButton);
	overlay.add(cancelButton);
	
	camButton.addEventListener('click', function(e) {
		Ti.Media.takePicture();
	});
	
	cancelButton.addEventListener('click', function(e) {
		Ti.Media.hideCamera();
		win.close();
	});
}

init();