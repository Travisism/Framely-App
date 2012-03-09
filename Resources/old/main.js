/**
 * TODO: Recrusive function that waits for facebook reply before tagging next photo
 */

var win = Ti.UI.currentWindow;
var cameraTransform = Titanium.UI.create2DMatrix();
var cameraButton;
var pleaseWait;
var currentOrientation = Titanium.UI.orientation;
var overlay = Ti.UI.createView({touchEnabled: true});
var curImageProcessed = 0;
var orientationCheck;

var photoIDs = [];
var bannerPhotos = [];

var progressBar;

function init() 
{
	// **********************************************************
	// Set up the graphical interface
	// **********************************************************
	win.backgroundImage = '../images/main_background.png';
	
	var loginButton = Ti.Facebook.createLoginButton({
		'style' : 'wide',
		bottom: 50
	});
	
	win.add(loginButton);
	
	cameraButton = Ti.UI.createButton({
		backgroundImage: '../images/take_photo.png',
		top: 100,
		width: 170,
		height: 59,
	});
	
	win.add(cameraButton);
	
	cameraTransform = cameraTransform.scale(1);
	
	// Detect camera press
	cameraButton.addEventListener('click', openCamera);
	
	// Detect orientation change to complain to users
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		currentOrientation = e.orientation;
	});
	
	
	
	
	
	// **********************************************************
	// Overlay creation
	// **********************************************************
		
	/*
	var profileOverlay = Ti.UI.createView({
		width: 320,
		height: 111,
		borderColor: '#dae3ff',
		borderWidth: 2,
		right: 0,
		top: 0,
		touchEnabled: false,
		opacity: .5
	});
	
	var bannerOverlay = Ti.UI.createView({
		width: 42,
		height: 303,
		right: 44, // used to be 12
		top: 123,
		borderColor: '#dae3ff',
		borderWidth: 2,
		touchEnabled: false,
		opacity: .5
	});
	*/
	
	var imageOverlay = Ti.UI.createImageView({
		width: 320,
		image: '../images/new_overlay.png',
		height: 441,
		left: 0,
		top: 1,
		touchEnabled: false
	});
	
	var bottomBar = Ti.UI.createImageView({
		bottom: 0,
		left: 0,
		image: '../images/camera_bottom.png',
		width: 320,
		height: 53
	});
	
	var camButton = Ti.UI.createButton({
		width: 99,
		height: 53,
		backgroundImage: '../images/camera_button.png',
		backgroundSelectedImage: '../images/camera_button_pressed.png',
		bottom: 0
	});
	
	var cancelButton = Ti.UI.createButton({
		width: 54,
		height: 53,
		backgroundImage: '../images/cancel_button.png',
		backgroundSelectedImage: '../images/cancel_button_pressed.png',
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
		cameraButton.animate({
			opacity: 1,
			duration: 300
		});
		// clearTimeout(orientationCheck);
	});
	
}




function cropImage(imageToCrop)
{
	// **********************************************************
	// Progress Bar
	// **********************************************************
	curImageProcessed = 0;
	
	progressBar = Ti.UI.createProgressBar({
		width: 200,
		min: 0,
		max: 6,
		value: 0,
		height: 70,
		color: '#888',
		message: 'Processing Image ' + curImageProcessed + ' of 6',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		},
		style: Ti.UI.iPhone.ProgressBarStyle.PLAIN,
		top: 200
	});
	
	win.add(progressBar);
	progressBar.show();
	

	// **********************************************************
	// Main Image Creation
	// **********************************************************
	// Create an imageview of image to be cropped
	var croppedImage = Ti.UI.createImageView({
		image: imageToCrop
	});
	
	// Turn image into a Blob
	var image = croppedImage.toBlob();
	// image = image.imageAsResized(692, 519);

	var sizeModifier = image.width / 692;
	// sizeModifier = 1;
	
	// Tell user to wait and animate out button
	pleaseWait = Ti.UI.createLabel({
		text: 'Chopping Images... Please wait',
		color: '#4a4947',
		top: 50,
		height: 25,
		opacity: 0,
		textAlign: 'center'
	});
	
	win.add(pleaseWait);
	
	pleaseWait.animate({
		opacity: 1,
		duration: 100
	});
	
	
	
	
	// **********************************************************
	// Main Profile Pic
	// **********************************************************
	var profilePicImage = image.imageAsCropped({
		width: 180 * sizeModifier,
		height: 519 * sizeModifier,
		x: 0,
		y: 0
	});
	
	var profilePicView = Ti.UI.createImageView({
		image: profilePicImage
	});
	
	uploadPhotoToFacebook(profilePicView, false);

	
	
	
	// **********************************************************
	// Profile Banner
	// **********************************************************
	var imageStrip = image.imageAsCropped({
		width: 492 * sizeModifier,
		height: 68 * sizeModifier,
		x: 200 * sizeModifier,
		y: 71 * sizeModifier
	});
	
	var imageStripView = Ti.UI.createImageView({
		image: imageStrip
	});
	
	
	// Create array of the image views
	for(var i = 0; i < 5; i++) {
		
		if(i) {
			var xVal = i * (99 * sizeModifier);
		} else {
			var xVal = 0;
		}
		
		var strip = imageStrip.imageAsCropped({
			width: Math.round(97 * sizeModifier * 1.33),
			height: Math.round(68 * sizeModifier * 1.33),
			x: xVal,
			y: 0
		});
		
	
		var stripView = Ti.UI.createImageView({
			image: strip
		});
		
		if(i == 4) {			
			var smallStripView = Ti.UI.createView({
				width: strip.width * 1.33,
				height: strip.height * 1.33,
				backgroundColor: '#000',
				image: strip
			});
			
			var smallStripImage = Ti.UI.createImageView({
				image: strip,
				height: strip.height,
				width: strip.width,
				left: 0,
				top: 0
			});
			
			smallStripView.add(smallStripImage);
			
			var newViewBlob = smallStripView.toImage();
			
			var newView = Ti.UI.createImageView({
				image: newViewBlob
			});
			
			bannerPhotos.push(newView);
		} else {
			bannerPhotos.push(stripView);
		}
	}
	
	// **********************************************************
	// Process banner
	// **********************************************************
	processBannerPhotos();
}

function processBannerPhotos()
{
	if(bannerPhotos.length) {
		
		setTimeout(function() {
			Ti.API.info("Processing Banner Photos: " + bannerPhotos.length);
			uploadPhotoToFacebook(bannerPhotos.pop(), true);
		}, 1000);
	} else {
		
		win.remove(pleaseWait);
		
		progressBar.hide();
		win.remove(progressBar);
		
		cameraButton.animate({
			opacity: 1,
			duration: 300
		});
		
		Titanium.UI.createAlertDialog({
				title:'Success!',
				message: 'Your images have been successfully uploaded!'
			}).show();
	}
}

function uploadPhotoToFacebook(imageView, tag)
{
	var data = {
		picture: imageView.image
	};
	
	Ti.Facebook.requestWithGraphPath('me/photos', data, "POST", function(e) {
		if(e.success) {
			
			progressBar.value = ++curImageProcessed;
			progressBar.message = "Processing Image " + curImageProcessed + " of 6";
			
			Ti.API.info("Uploading image was a success.");
			if(tag) {
				var result = JSON.parse(e.result);
				tagPhoto(result.id);
			} else {
				Ti.API.info("Profile Pic: " + e.result);
			}
		} else {
			Titanium.UI.createAlertDialog({
				title:'Error Uploading',
				message:e.data
			}).show();
		}
	});
}

function tagPhoto(photoID)
{
	Ti.Facebook.requestWithGraphPath(photoID + '/tags/' + Ti.Facebook.uid, {x: '0', y: '0'}, 'POST', function(e){
		if(e.success) {
			Ti.API.info("Tagging was a success");
			processBannerPhotos();
		} else {
			Titanium.UI.createAlertDialog({
				title:'Error Tagging',
				message: e
			}).show();
		}
	});
}

function saveToGallery(imageView)
{
	Titanium.Media.saveToPhotoGallery(imageView.image, {
		success: function(e) {
			/*
			Titanium.UI.createAlertDialog({
				title:'Facebook Hack',
				message:'Image Saved'
			}).show();		
			*/
		},
		error: function(e) {
			Titanium.UI.createAlertDialog({
				title:'Error saving',
				message:e.error
			}).show();
		}
	});
}

function openCamera(e)
{
	orientationCheck = setTimeout(function() {
		if(currentOrientation != 3) {
			alert("Please rotate your phone to the left.");
		}
	}, 5000);
	
	cameraButton.animate({
		opacity: 0,
		duration: 100
	});
	
	Titanium.Media.showCamera({
		success:function(event)
		{
			// var cropRect = event.cropRect;
			// var image = event.media;
			
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				clearTimeout(orientationCheck);
				
				cropImage(event.media);
				
				// Ti.Media.hideCamera();
			} else {
				alert("Wrong type: " + event.mediaType);
			}
		}, 
		cancel: function()
		{
			clearTimeout(orientationCheck);
			cameraButton.animate({
				opacity: 1,
				duration: 300
			});
		},
		error: function(error)
		{
			clearTimeout(orientationCheck);
			cropImage('../images/size_template_giant.png');
		},
		saveToPhotoGallery: false,
		allowEditing: false,
		overlay: overlay,
		transform: cameraTransform,
		autohide: true,
		showControls: false,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

init();