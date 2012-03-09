Ti.include('/library/frames.js');

// Views & Windows
var win = Ti.UI.currentWindow;
var view;

// Labels
var infoLabel;

// Buttons

// Images
var themes;


var init = function()
{
	win.backgroundImage = '/images/bg.png';
	
	view = Ti.UI.createScrollView({
		contentHeight: 'auto',
		contentWidth: 'auto',
		top: 0,
		showHorizontalScrollIndicator: false,
		showVerticalScrollIndicator: true
	});
	win.add(view);
	
	infoLabel = Ti.UI.createLabel({
		text: 'Tap a theme below to Theme your profile.',
		top: 10,
		width: 300,
		height: 'auto'
	});
	view.add(infoLabel);
	
	
	themes = [
		{
			preview: '1_preview.png',
			image: '1.jpg'
		},
		{
			preview: '2_preview.png',
			image: '2.jpg'
		},
		{
			preview: '3_preview.png',
			image: '3.jpg'
		},
		{
			preview: '4_preview.png',
			image: '4.jpg'
		},
	];
	
	for(key in themes) {
		
		var themeView = Ti.UI.createButton({
			image: '/images/themes/' + themes[key].image,
			width: '300',
			height: '234',
			data: themes[key].image,
			top: 70 + key * 244,
			borderWidth: '1px',
			borderColor: '#efefef'
		});
		
		themeView.addEventListener('click', debugTheme);
		
		view.add(themeView);
		
		var themeOverlay = Ti.UI.createImageView({
			image: '/images/themes/overlay.png',
			width: '300',
			height: '234',
			top: 70 + key * 244,
			borderWidth: '1px',
			borderColor: '#4a4947',
			touchEnabled: false
		});
		
		view.add(themeOverlay);
		
	}
}

var debugTheme = function(e)
{
	var alert = Ti.UI.createAlertDialog({
		title: 'Hello',
		message: 'Are you sure you want to set this as your theme?',
		buttonNames: ['Yes!', 'No!']
	});
	
	alert.addEventListener('click', function(event) {
		
		if(event.index == 0) {
			
			var upload = Ti.UI.createWindow({
				url: '/modal_windows/upload_photo.js',
				modal: false,
				navBarHidden: true,
				'data': {
					numImages: 6
				}
			});
			upload.open();
			
			
			var theme = e.source.data;
			var photo = Ti.UI.createImageView({
				image: '/images/themes/' + theme,
				width: 'auto',
				height: 'auto'
			});
			photo = photo.toBlob();
			
			createFullFrame(photo);
		}
	});
	
	alert.show();
}

init();
