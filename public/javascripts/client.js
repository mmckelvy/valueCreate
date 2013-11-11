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
	});

	// CHARTING
    $('#chart1-container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
    });
	
});