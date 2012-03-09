// Vars
var win = Ti.UI.currentWindow;

var progressBar;
var activityIndicator;

var imagesUploaded;
var numImages;

var init = function()
{
	// Set Vars
	numImages = win.data.numImages;
	// win.backgroundImage = "/images/bg.png";
	win.backgroundColor = "#efefef";
	imagesUploaded = 0;
	
	
	// Progress Bar
	progressBar = Ti.UI.createProgressBar({
		width: 250,
		min: 0,
		max: numImages,
		value: 0,
		height: 100,
		color: '#000',
		message: 'Processing Image 0 of ' + numImages,
		font: {
			fontSize: 14,
			fontWeight: 'bold',
		},
		style: Ti.UI.iPhone.ProgressBarStyle.PLAIN,
		top: 180
	});
	win.add(progressBar);
	progressBar.show();
	
	
	// Cancel Button
	cancelButton = Ti.UI.createButton({
		title: "Cancel Upload",
		width: 200,
		height: 33,
		bottom: 50
	});
	win.add(cancelButton);
	
	cancelButton.addEventListener('click', function() {
		alert("Oops thats not supported yet");
	});
	
	
	// Activity Indicator
	activityIndicator = Ti.UI.createActivityIndicator({
		top: 130,
		height: 50,
		width: '20',
		style:	Ti.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	win.add(activityIndicator);
	activityIndicator.show();
	
	
	// Event Listeners
	Ti.App.addEventListener("photoProcessed", photoProcessed);
	Ti.App.addEventListener("profilePic", profilePic);
	Ti.App.addEventListener("finishedUploading", finishedUploading);
}


/*
 * Photo has finished processing
 */
var photoProcessed = function(e)
{
	progressBar.value = ++imagesUploaded;
	progressBar.message = "Processing Image " + imagesUploaded + " of " + numImages;
}


/*
 * Main Profile pic needs to be set
 */
var profilePic = function(e)
{
	// alert("Needs to upload the facebook photo");
}


/*
 * The images are finished uploading
 */
var finishedUploading = function(e)
{
	win.close();
	// alert("Closed!");
}
























init();