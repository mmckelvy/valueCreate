$(function () {
	
	// RENDERING
	var renderElements = function (template) {
		var templateSource = template.html();
		var renderTemplate = Handlebars.compile(templateSource);
		var rendered = renderTemplate({});
		$('.maincontent').append(rendered);
	};
	
	var showElements = function (displayElement, focusElement) {
		displayElement.addClass('show');
		focusElement.focus();
    	};
	
    var createChart = function (container, data) {
        Highcharts.setOptions({
            chart: {
                style: {
                    fontFamily: 'Helvetica Neue',
                    fontWeight: '200'
                }
            }
        });
        
        container.highcharts({
            chart: {
                type: 'waterfall'
            },

            title: {
                text: 'Sources of Return'
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                title: {
                    text: ''
                }
            },

            legend: {
                enabled: false
            },

            tooltip: {
                pointFormat: '<b>${point.y:,.2f}</b> USD'
            },

            series: [{
                upColor: '#686868',
                data: [{
                    name: 'Beginning Equity',
                    y: 120000
                }, 
                {
                    name: 'EBITDA growth',
                    y: 569000
                }, 
                {
                    name: 'Free Cash Flow Generation',
                    y: 231000
                }]
                dataLabels: {
                    enabled: false,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y / 1000, 0, ',');
                    },
                    style: {
                        color: '#FFFFFF',
                        fontWeight: '200',
                        textShadow: '0px 0px 3px black'
                    }
                },
                pointPadding: 0
            }]
        });
    };
    // EVENTS
    // On click of the 'new company' text, render a new company input form via Handlebars.
    $('.introcontent').on('click', '#newCo', function (e) {
        if ($('#add-company-container').length === 0) { 
            renderElements($('#newCo-template'));
            setTimeout( function () {
                showElements($('#add-company-container'), $('#first-input')); 
            }, 0 );
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

        $('.maincontent').empty();
        renderElements($('#chart-template'));
        createChart($('#chart1-container'));
    });
});