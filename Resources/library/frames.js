// Vars
var images;

var createFullFrame = function(media)
{
	// Array to hold all the images that need chopping
	images = new Array();
	
	
	// The Photo
	var photo = Ti.UI.createImageView({
		image: media
	});
	photo = photo.toBlob();
	
	// Size Modifier
	var sizeModifier = photo.width / 692;
	
	// Profile Image
	images[images.length] = {
		image: media,
		width: 180 * sizeModifier,
		height: 519 * sizeModifier,
		x: 0 * sizeModifier,
		y: 0 * sizeModifier,
		tag: false
	};
	
	var numLines;
	if(Ti.App.Properties.getString('numTextLines')) {
		numLines = Ti.App.Properties.getInt('numTextLines');
	} else {
		numLines = 2;
		Ti.App.Properties.setInt('numTextLines', 2);
	}
	
	// Profile Bar
	var imageStrip = photo.imageAsCropped({
		width: 492 * sizeModifier,
		height: 68 * sizeModifier,
		x: 200 * sizeModifier,
		// y: 71 * sizeModifier
		y: (30 + (numLines * 15) + 12) * sizeModifier
	});
	
	Ti.API.log("Size odifier: " + sizeModifier);
	
	
	var imageStripView = Ti.UI.createImageView({
		image: imageStrip
	});
	
	// Create array of image views
	for(var i = 0; i < 5; i++) {
		
		if(i) {
			var xVal = i * (99 * sizeModifier);
		} else {
			var xVal = 0;
		}
		
		if(i == 4) {
			
			
			var strip = imageStrip.imageAsCropped({
				width: Math.round(97 * sizeModifier * 1.33),
				height: Math.round(68 * sizeModifier * 1.33),
				x: xVal,
				y: 0
			});
			
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
			
			images[images.length] = {
				image: newView.image,
				width: smallStripView.width,
				height: smallStripView.height,
				x: 0,
				y: 0,
				tag: true
			};
			
		} else {
			images[images.length] = {
				image: imageStripView.image,
				width: Math.round(97 * sizeModifier * 1.33),
				height: Math.round(68 * sizeModifier * 1.33),
				x: xVal,
				y: 0,
				tag: true
			};
		}
	}
	
	// Process all the photos
	nextPhoto();
}









// ****************
// Helper Functions
// ****************
var nextPhoto = function()
{
	if(images.length) {
		setTimeout(function() {
			processPhoto(images.pop());
		}, 500);
		Ti.App.fireEvent("photoProcessed");
	} else {
		Ti.App.fireEvent("finishedUploading");
	}
}


var processPhoto = function(media)
{
	// Create an image to start cropping
	var photo = Ti.UI.createImageView({
		image: media.image
	});
	photo = photo.toBlob();
	
	
	var fbImage = photo.imageAsCropped({
		width: media.width,
		height: media.height,
		x: media.x,
		y: media.y
	});
	
	var fbImageView = Ti.UI.createImageView({
		image: fbImage
	});
	
	uploadPhotoToFacebook(fbImageView, media.tag);
}





function uploadPhotoToFacebook(imageView, tag)
{
	var data = {
		picture: imageView.image
	};
	
	Ti.Facebook.requestWithGraphPath('me/photos', data, "POST", function(e) {
		if(e.success) {
			
			Ti.API.info("Uploading image was a success.");
			if(tag) {
				var result = JSON.parse(e.result);
				tagPhoto(result.id);
			} else {
				Ti.API.info("Profile Pic: " + e.result);
				
				var result = JSON.parse(e.result);
				
				// Open a web view using the pic ID to let the user set as profile pic
				// Ti.App.fireEvent("profilePic", {profilePic: result.id})
				
				var profileWin = Ti.UI.createWindow({
					url: '/modal_windows/set_profile.js',
					modal: true,
					navBarHidden: true,
					'data': {
						profilePic: result.id
					}
				});
				profileWin.open();
				
				nextPhoto();
			}
		} else {
			Titanium.UI.createAlertDialog({
				title:'Error Uploading',
				message: e
			}).show();
		}
	});
}

function tagPhoto(photoID)
{
	Ti.Facebook.requestWithGraphPath(photoID + '/tags/' + Ti.Facebook.uid, {x: '0', y: '0'}, 'POST', function(e){
		if(e.success) {
			nextPhoto();
			Ti.API.info("Tagging was a success");
		} else {
			Titanium.UI.createAlertDialog({
				title:'Error Tagging',
				message: e
			}).show();
		}
	});
}





