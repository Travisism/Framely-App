Ti.include('/library/frames.js');

var win = Ti.UI.currentWindow;
win.backgroundImage = '/images/bg.png';


// Upload page
var upload;


// Camera Stuff
var cameraTransform;
var overlay;


var init = function()
{
	createUI();
	
	upload = Ti.UI.createWindow({
		url: '/modal_windows/upload_photo.js',
		modal: false,
		navBarHidden: true,
		'data': {
			numImages: 6
		},
		width: 290,
		height: 450,
		borderColor: '#4a4947',
		borderRadius: 5,
		borderWidth: 10,
		opacity: 0.95
	});
	
	Ti.App.addEventListener('startUpload', processPicture);

	
	var facebookButton = Ti.Facebook.createLoginButton({
		bottom: 20
	});
	win.add(facebookButton);
}




// Camera Stuff
var openCamera = function()
{
	if(!overlay) {
		Ti.API.log("creating camera overlay");
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
		
		camButton.addEventListener('click', takePicture);
		cancelButton.addEventListener('click', closeCamera);
	}
	
	Titanium.Media.showCamera({
		success:function(event)
		{
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				Ti.App.fireEvent('startUpload');
				createFullFrame(event.media);
				
				Ti.Media.hideCamera();
			} else {
				alert("Wrong type: " + event.mediaType);
			}
		}, 
		cancel: function()
		{
			// nothing should happen here
		},
		error: function(error)
		{
			alert("No camera detected.");
		},
		saveToPhotoGallery: true,
		allowEditing: false,
		overlay: overlay,
		transform: cameraTransform,
		autohide: true,
		showControls: false,
		animated: true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

var processPicture = function(e)
{
	upload.open();
}

var takePicture = function(e)
{
	Ti.Media.takePicture();
}

var closeCamera = function(e)
{
	Ti.Media.hideCamera();
}







// Gallery Stuff
var openGallery = function()
{
	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			// set image view
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				Ti.App.fireEvent('startUpload');
				createFullFrame(event.media);
			}
			else
			{
				alert("for some reason the photo gallery failed!" + event);
			}
		},
		cancel:function()
		{
			// this shouldn't happen
		},
		error:function(error)
		{
			alert("Could not open gallery: " + e);
		},
		allowEditing: false,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
	});
}




// Themes
var openThemes = function()
{
	var themes = Ti.UI.createWindow({
		url: '/modal_windows/themes.js',
		modal: false,
		navBarHidden: true,
	});
	themes.open();
}







var openSettings = function() {
	var settings = Ti.UI.createWindow({
		url: '/modal_windows/settings.js',
		modal: false,
		navBarHidden: true
	});
	settings.open();
}









// Init functions
var createUI = function()
{
	/* **************************************
	 *   Header Bar
	 * **************************************/
	var header = Ti.UI.createLabel({
		text: "Framely",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 20,
			fontWeight: 'bold'
		},
		color: '#fff',
		shadowColor: '#9aaacc',
		shadowOffset: {
			x: 0,
			y: -1
		},
		height: 44,
		width: 320,
		top: 0,
		backgroundColor: '#3b5998',
		textAlign: 'center',
		opacity: 0.95
	});
	win.add(header);
	
	
	
	/* **************************************
	 *   Header Content
	 * **************************************/
	var headerText = Ti.UI.createLabel({
		text: "Welcome to Framely! The awesomest way to customize your Facebook profile.",
		top: 55,
		width: 300,
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 16
		},
		color: '#000',
		shadowColor: '#efefef',
		shadowOffset: {
			x: 0,
			y: -1
		},
		height: 'auto'
	});
	win.add(headerText);
	
	
	var chooseMedia = Ti.UI.createLabel({
		text: "Select Photo Type",
		top: 110,
		width: 300,
		height: 'auto',
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 20,
		},
		color: '#000',
		shaowColor: '#efefef',
		shadowOffset: {
			x: 0,
			y: -1
		},
	});
	win.add(chooseMedia);
	
	
	
	
	/* **************************************
	 *   Buttons
	 * **************************************/
	// Settings
	var settingsButton = Ti.UI.createButton({
		backgroundImage: '/images/settings_button.png',
		width: 28,
		height: 28,
		right: 7,
		top: 7
	});
	win.add(settingsButton);
	
	
	// Camera
	var cameraButton = Ti.UI.createButton({
		title: "Take New Photo",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 16
		},
		color: '#000',
		top: 154,
		height: 55,
		width: 143,
		left: 10
	});
	win.add(cameraButton);
	
	var cameraText = Ti.UI.createLabel({
		text: "Take a new photo using your camera.",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 14
		},
		color: '#000',
		left: 163,
		top: 154,
		height: 55,
		width: 147
	});
	win.add(cameraText);
	
	
	// Gallery
	var galleryButton = Ti.UI.createButton({
		title: "Existing Photos",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 16
		},
		color: '#000',
		top: 231,
		height: 55,
		width: 143,
		left: 10
	});
	win.add(galleryButton);
	
	var galleryText = Ti.UI.createLabel({
		text: "Use a photo you've already taken.",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 14
		},
		color: '#000',
		left: 163,
		top: 231,
		height: 55,
		width: 147
	});
	win.add(galleryText);
	
	
	// Themes
	var themesButton = Ti.UI.createButton({
		title: "Custom Themes",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 16
		},
		color: '#000',
		top: 308,
		height: 55,
		width: 143,
		left: 10
	});
	win.add(themesButton);
	
	var themesText = Ti.UI.createLabel({
		text: "Premade themes for spicing up your profile.",
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 14
		},
		color: '#000',
		left: 163,
		top: 308,
		height: 55,
		width: 147
	});
	win.add(themesText);
	

	/* **************************************
	 *   Event Listeners
	 * **************************************/
	settingsButton.addEventListener('click', openSettings);
	cameraButton.addEventListener('click', openCamera);
	galleryButton.addEventListener('click', openGallery);
	themesButton.addEventListener('click', openThemes);
}





init();