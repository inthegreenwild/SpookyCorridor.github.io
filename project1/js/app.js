$(document).ready(function() {

	console.log("Resources loaded");

	// contact submit event handler
	$('#form-send').on('click', function() {
		app.buildQuery();
		console.log('Clicked form submit..');
	}); 
	// expand options for wallpaper or video 
	$('span>a').on('click', function() {
		var choice = $(this).html().trim();
		console.log(choice);
		$(this).parent().text(choice);
		if (choice == 'wallpaper') {
			$('#choice-wallpaper').fadeIn();
		} else if (choice == 'video') {
			$('#choice-video').fadeIn();
		}
		
	}); // end span click 

	$('#advanced').on('click', function() {
		$(this).siblings('#form-send').appendTo('#wallpaper-advanced');
		$(this).fadeOut();
		$('#wallpaper-advanced').fadeIn().append('');

	});
});

var app = app || {}; 

app.createFormObject = function() {

	var retJson = {}; 

	retJson.searchTerms = $('#search-terms').val();
	retJson.searchSubr = $('#search-subreddit').val();
	retJson.searchSort = $('#search-sort').val(); 
	retJson.searchTime = $('#search-time').val();
	retJson.searchSource = $('#search-source').val();
	retJson.searchUsername = $('#search-username').val();

	return retJson; 
}

//get JSON with user defined query  
app.buildQuery = function(data) {
	data = app.createFormObject();
	var num = Math.floor(Math.random() * 6 + 1); 
	var sub = data.searchSubr;
	var tags = data.searchTerms; 
	var time = data.searchTime; 
	var searchQuery = 'http://www.reddit.com/r/' + sub + '/search.json?q=' + 
	tags + '&restrict_sr=' + sub + '&t=' + time + '&limit=100';
	$.getJSON(searchQuery, function(data) {
      	return app.generateContent(data.data.children[num].data.url);
});
}


app.generateContent = function(link) {
	if ( link.indexOf('i.imgur') >= 0 ) {
		console.log(link + 'is i'); 
		$('section').append('<img src="' + link + '.jpg">');
	} else {
		console.log(link + 'is not i'); 
		$('section').append('<img src="' + link + '">');
	}

}