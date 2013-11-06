$(function () {
	// Start with create a new company.
	// On click of new company, send an ajax request, render a form via handlebars.
	$(document).on('click', '#newCo', function (e) {
		console.log('test');
		var templateSource = $('#newCo-template').html();
		var renderTemplate = Handlebars.compile(templateSource);
		var rendered = renderTemplate({});
		$('.maincontent').append(rendered);
		
	});		
});