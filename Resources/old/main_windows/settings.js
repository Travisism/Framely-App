var win = Ti.UI.currentWindow;
var view;

// Vars
var numLines;

// Labels
var headerLabel;
var heightLabel;
var curHeightLabel;

var fbLogin;

// Controls
var heightSlider;


var init = function()
{
	win.backgroundImage = '/images/bg.png';
	
	if(Ti.App.Properties.getInt('numTextLines')) {
		numLines = Ti.App.Properties.getInt('numTextLines');
	} else {
		numLines = 2;
		Ti.App.Properties.setInt('numTextLines', 2);
	}
	view = Ti.UI.createScrollView({
		contentHeight: 'auto',
		contentWidth: 'auto',
		top: 0,
		showVerticalScrollIndicator: true,
		showHorizontalScrollIndicator: false
	});
	win.add(view);
	
	headerLabel = Ti.UI.createLabel({
		text: 'Configure Framely',
		top: 10,
		width: 300,
		height: 'auto',
		font: {
			fontSize: 16,
			fontWeight: 'bold'
		},
		color: '#000000'
	});
	view.add(headerLabel);
	
	/*
	 * 30px for top banner + margin
	 * 15 for each line
	 */
	
	// Label for how many lines
	heightLabel = Ti.UI.createLabel({
		text: 'How many lines of text above the frames?',
		width: 300,
		height: 'auto',
		top: 44,
		font: {
			fontSize: 15
		},
		color: '#000'
	});
	view.add(heightLabel);
	
	
	curHeightLabel = Ti.UI.createLabel({
		text: '2 Lines',
		width: 300,
		height: 15,
		top: 80,
		textAlign: 'center',
		font: {
			fontFamily:'Helvetica Neue',
			fontSize:15
		},
		color: '#999'
	});
	view.add(curHeightLabel);
	
	
	heightSlider = Titanium.UI.createSlider({
		min: 1,
		max: 5,
		value: numLines,
		width: 300,
		height: 'auto',
		top: 100
	});
	view.add(heightSlider);
	
	heightSlider.addEventListener('change', updateSlider);
	
	fbLogin = Ti.Facebook.createLoginButton({
		bottom: 20
	});
	win.add(fbLogin);
	
}

var updateSlider = function(e)
{
	numLines = Math.round(e.value);
	curHeightLabel.text = numLines + " Lines";
	
	Ti.App.Properties.setInt("numTextLines", numLines);
}












init();