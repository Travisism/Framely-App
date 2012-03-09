// Includes
Ti.include('/library/frames.js');

var win = Ti.UI.currentWindow;

// Labels
var infoLabel;

// Buttons
var cameraButton;

// Views
var frameTypes;
var scrollableView;

// Data
var activeFrame;

// Overlay
var cameraTransform;
var cameraButton;
var overlay;

var upload;


var init = function()
{
	win.backgroundImage = '/images/bg.png';
	
	infoLabel = Ti.UI.createLabel({
		text: "Loading camera...",
		color: '#4a4947',
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 20
		},
		height: 'auto',
		top: 130,
		width: 'auto',
		textAlign: 'center'
	});
	win.add(infoLabel);
	

	// Activity Indicator
	activityIndicator = Ti.UI.createActivityIndicator({
		top: 150,
		height: 50,
		width: '20',
		style:	Ti.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	win.add(activityIndicator);
	activityIndicator.show();	
	
	
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
		Ti.UI.currentWindow.tabGroup.setActiveTab(0);
	});
	
	
	upload = Ti.UI.createWindow({
		url: '/modal_windows/upload_photo.js',
		modal: false,
		navBarHidden: true,
		'data': {
			numImages: 6
		}
	});
	
	
	win.addEventListener('focus', receiveFocus);
};

var receiveFocus = function(e)
{
	if(Ti.Facebook.loggedIn) {
		openCamera();
	} else {
		alert("You must log in first!");
		Ti.UI.currentWindow.tabGroup.setActiveTab(0);
	}
}

var openCamera = function()
{
	Titanium.Media.showCamera({
		success:function(event)
		{
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				upload.open();
				
				createFullFrame(event.media);
				
				Ti.UI.currentWindow.tabGroup.setActiveTab(0);
				
				Ti.Media.hideCamera();
				
			} else {
				alert("Wrong type: " + event.mediaType);
			}
		}, 
		cancel: function()
		{
			Ti.UI.currentWindow.tabGroup.setActiveTab(0);
		},
		error: function(error)
		{
			alert("No camera detected.");
			Ti.UI.currentWindow.tabGroup.setActiveTab(0);
		},
		saveToPhotoGallery: false,
		allowEditing: false,
		overlay: overlay,
		transform: cameraTransform,
		autohide: true,
		showControls: false,
		animated: true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

init();
