Ti.Facebook.appid = "174432269280290";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'user_photos'];

var framely = Ti.UI.createWindow({
	url: '/framely.js',
	fullscreen: true	
});
framely.open();

/*
var mainView = Ti.UI.currentWindow;

var mainWin = Ti.UI.createWindow({
	url: 'main_windows/framely.js',
	navBarHidden: true,
	fullscreen: true,
	height: Ti.Platform.displayCaps.platformHeight,
	width: Ti.Platform.displayCaps.platformWidth
})

mainWin.open();

// This is a pointless change to test gitub

// *********
// Tab Groups
// *********
var tabGroup = Ti.UI.createTabGroup({id: 'framelyTabs'});


// Create Tabs
var mainWin = Ti.UI.createWindow({
	url:'main_windows/main.js',
	title: 'Welcome',
	barColor: '#6981b3'
});

var mainTab = Ti.UI.createTab({
	id: 'mainTab',
	window: mainWin,
	icon: 'images/icons/button_info.png',
	title: 'Welcome'
});


var galleryWin = Ti.UI.createWindow({
	url: 'main_windows/gallery.js',
	title: 'Load From Gallery',
	barColor: '#6981b3'
});

var galleryTab = Ti.UI.createTab({
	id: 'galleryTab',
	window: galleryWin,
	icon: 'images/icons/button_gallery.png',
	title: 'Gallery'
});


var cameraWin = Ti.UI.createWindow({
	url: 'main_windows/camera.js',
	title: 'Loading Camera',
	barColor: '#6981b3'
});

var cameraTab = Ti.UI.createTab({
	id: 'cameraTab',
	window: cameraWin,
	icon: 'images/icons/button_photo.png',
	title: 'Camera'
});


var themesWin = Ti.UI.createWindow({
	url: 'main_windows/themes.js',
	title: 'Framely Themes',
	barColor: '#6981b3'
});

var themesTab = Ti.UI.createTab({
	id: 'themesTab',
	window: themesWin,
	icon: 'images/icons/button_themes.png',
	title: 'Themes'
});


var settingsWin = Ti.UI.createWindow({
	url: 'main_windows/settings.js',
	title: 'Settings',
	barColor: '#6981b3'
});

var settingsTab = Ti.UI.createTab({
	id: 'settingsTab',
	window: settingsWin,
	icon: 'images/icons/button_settings.png',
	title: 'Settings'
});





// Add Tabs
tabGroup.addTab(mainTab);
tabGroup.addTab(galleryTab);
tabGroup.addTab(cameraTab);
tabGroup.addTab(themesTab);
tabGroup.addTab(settingsTab);
tabGroup.open();

*/
