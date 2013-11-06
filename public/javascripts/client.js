$(function () {
	// Start with create a new company.
	// On click of new company, send an ajax request, render a form via handlebars.
	$(document).on('click', '#newCo', function (e) {
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
});