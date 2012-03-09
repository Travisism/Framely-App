Ti.Facebook.appid = "YOUR_FACEBOOK_APP_ID";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'user_photos'];

var framely = Ti.UI.createWindow({
	url: '/framely.js',
	fullscreen: true	
});
framely.open();