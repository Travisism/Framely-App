Ti.include('/library/frames.js');

// Vars
var win = Ti.UI.currentWindow;

// Labels
var infoLabel;

// Buttons
var galleryButton;


var init = function() {
	
	win.backgroundImage = '/images/bg.png';
	
	infoLabel = Ti.UI.createLabel({
		text: "To frame an image from your photo gallery, click the Open button below",
		height: 'auto',
		width: 'auto',
		left: 10,
		top: 10
	});
	
	win.add(infoLabel);
	
	galleryButton = Ti.UI.createButton({
		title: "Open Gallery",
		top: 64,
		height: 40,
		width: 300
	});
	
	win.add(galleryButton);
	
	galleryButton.addEventListener('click', openGallery);
};



var openGallery = function(e)
{
	if(!Ti.Facebook.loggedIn) {
		
		alert("You must log in before you can upload an image");
		Ti.UI.currentWindow.tabGroup.setActiveTab(0);
		
		return;
	}
	var upload = Ti.UI.createWindow({
		url: '/modal_windows/upload_photo.js',
		modal: false,
		navBarHidden: true,
		'data': {
			numImages: 6
		}
	});
	
	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				upload.open();
				createFullFrame(event.media);
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





init();