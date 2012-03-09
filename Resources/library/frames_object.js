var fullFrame = {
	
	images: new Array(),
	photo: null,
	sizeModifier: 0,
	
	addMedia: function(media) {
		this.photo = Ti.UI.createImageView({
			image: media
		});
		
		this.sizeModifier = this.photo.width / 692;
	}
	

	
}
