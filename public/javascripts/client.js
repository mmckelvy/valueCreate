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

            credits: {
                enabled: false
            },
            
            exporting: {
                enabled: false
            },

            title: {
                text: ''
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                gridLineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                }
            },

            legend: {
                enabled: false
            },

            tooltip: {
                pointFormat: '<b>${point.y:,.2f}</b> USD'
            },

            plotOptions: {
                series: {
                    borderWidth: 0
                }
            },

            series: [{
                color: '#B2E0C2',
                data: [{
                    name: 'beginning equity',
                    y: 12000000,
                    color: '#cecece'
                }, 
                {
                    name: 'ebitda growth',
                    y: 56900000
                }, 
                {
                    name: 'fcf generation',
                    y: 70000000
                }, 
                {
                    name: 'multiple expansion',
                    y: 40000000
                }, 
                {
                    name: 'ending equity',
                    isSum: true,
                    color: '#cecece'
                }],
                
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y / 1000000, 0, ',');
                    },
                    style: {
                        color: '#000000',
                        fontWeight: '400'
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
