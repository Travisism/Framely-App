Ti.include('/library/frames.js');

var win = Ti.UI.currentWindow;

// Vars and crap
var view;

var init = function()
{
	win.backgroundImage = "/images/bg.png";
	
	view = Ti.UI.createScrollView({
		contentHeight: 'auto',
		contentWidth: 'auto',
		top: 0,
		showHorizontalScrollIndicator: false,
		showVerticalScrollIndicator: true
	});
	win.add(view);
	
	var infoLabel = Ti.UI.createLabel({
		text: 'Tap a theme below to Theme your profile.',
		top: 10,
		width: 250,
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
		
		themeView.addEventListener('click', processTheme);
		
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
	
	var closeButton = Ti.UI.createButton({
		title: "Close Themes",
		top: 80 + themes.length * 244,
		height: 33,
		width: 200
	});
	view.add(closeButton);
	
	closeButton.addEventListener('click', function() {
		win.close();
	});
}


var processTheme = function(e)
{
	var alert = Ti.UI.createAlertDialog({
		title: 'Hello',
		message: 'Are you sure you want to set this as your theme?',
		buttonNames: ['Yes!', 'No!']
	});
	
	alert.addEventListener('click', function(event) {
		
		if(event.index == 0) {
			Ti.App.fireEvent('startUpload');
			
			var theme = e.source.data;
			var photo = Ti.UI.createImageView({
				image: '/images/themes/' + theme,
				width: 'auto',
				height: 'auto'
			});
			photo = photo.toBlob();
			
			createFullFrame(photo);
			win.close();
		}
	});
	
	alert.show();
}



init();