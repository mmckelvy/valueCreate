$(function () {
	
	// On click of the 'new company' text, render a new company input form via Handlebars.
	$('.introcontent').on('click', '#newCo', function (e) {
		if ($('#add-company-container').length === 0) { 
			var templateSource = $('#newCo-template').html();
			var renderTemplate = Handlebars.compile(templateSource);
			var rendered = renderTemplate({});
			$('.maincontent').append(rendered);
			setTimeout(function () {
				$('#add-company-container').addClass('show');
				$('#company-name').focus();
			},0);
		}
	});		
	
	// On click of the submit form, send the form data to the server.
	$('.maincontent').on('submit', '#add-company-form', function (e) {
		e.preventDefault();
		$.post ('/newcompany', $('#add-company-form').serialize(), function (data) {
			$('#add-company-form').serialize();
			// Receive calculations from the server.  Create new object to hold this data.
			var results = data;
			console.log(results);
		});
		// Clear and hide the form.
		// Create a chart. [should be a function].
		$('#add-company-container').addClass('animated flipOutX');
		setTimeout( function () {
			$('#add-company-container').empty();
		}, 1000);
	});


});