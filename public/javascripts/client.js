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
		console.log('test');
		$.post ('/newcompany', $('#add-company-form').serialize(), function (data) {
			console.log($('#add-company-form').serialize());
			console.log(data);
		});
	});
});