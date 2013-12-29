$(function () {
	
	// RENDERING
	// Processes Handlebars templates.
    var renderElements = function (template, data) {
		var templateSource = template.html();
		var renderTemplate = Handlebars.compile(templateSource);
		var rendered = renderTemplate(data);
		$('.maincontent').append(rendered);
	};
	
    // Displays a hidden element.
	var showElements = function (displayElement) {
		displayElement.addClass('show');
	};

    // Creates a High Chart.
    var createChart = function (container, results) {
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
                enabled: false
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
                    y: results.begEquity,
                    color: '#cecece'
                }, 
                {
                    name: 'ebitda growth',
                    y: results.ebitdaSourceReturns
                }, 
                {
                    name: 'fcf generation',
                    y: results.freeCashFlow
                }, 
                {
                    name: 'multiple expansion',
                    y: results.multipleSourceReturns
                }, 
                {
                    name: 'ending equity',
                    isSum: true,
                    color: '#cecece'
                }],
                
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, 0, ',');
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
    // On click of the 'register' text, render a username / password form via Handlebars.
    $('.introcontent').on('click', '#register', function (e) {
        $('.maincontent').empty();
        if ($('#register-container').length === 0) {
            renderElements($('#register-template'));
            setTimeout( function () {
                showElements($('#register-container'));
            }, 0 );
        }
    });

    // On click of the registration form 'submit' button, send username and password to the server for processing.
    $('.maincontent').on('submit', '#register-form', function (e) {
        e.preventDefault();
        $.post ('/register', $('#register-form').serialize(), function (results) {
            $('.maincontent').empty();
            console.log(results);
            renderElements($('#message-template'), results);
            setTimeout( function () {
                showElements($('#message-container'));
            }, 0 );
        });
    });

    // On 

    // On click of the 'new company' text, render a new company input form via Handlebars.
    $('.introcontent').on('click', '#newCo', function (e) {
        $('.maincontent').empty();
        if ($('#add-company-container').length === 0) { 
            renderElements($('#newCo-template'));
            setTimeout( function () {
                showElements($('#add-company-container'));
                $('#first-input').focus(); 
            }, 0 );
        }
    });     
    
    // On click of the submit form, send the form data to the server, then render the valuation results (received from server).
    $('.maincontent').on('submit', '#add-company-form', function (e) {
        e.preventDefault();
        $.post ('/newcompany', $('#add-company-form').serialize(), function (results) {
            // Receive calculations from the server.  If user input was inaccurate, return an error message, else, render the calculation results.
            $('.maincontent').empty();
            if ( results === "error" || "message" in results ) {
                $('.maincontent').append("Invalid input, please try again");
            }
            else {
                renderElements($('#results-template'), results);
                createChart($('#chart-container'), results);
            }
        });
    });

    // On click of 'existing company' text, get the available companies from server, render in a form.
    $('.introcontent').on('click', '#existingCo', function (e) {
        $('.maincontent').empty();
        // Make an ajax call to get list of companies
        $.get ('/existingcompany', null, function (results) {
            //render company form here.
            if ($('#existing-company-container').length === 0) {
                renderElements($('#existingList-template'), {results: results});
                setTimeout( function () {
                    showElements($('#existing-company-container'));
                }, 0);
            }
        });
    });

    // On click of particular company, send value of company clicked to the server.
    $('.maincontent').on('click', '.clickable', function (e) {
        var queryItem = $(this).attr('name');
        $.get ('/findexisting', {queryItem: queryItem}, function (results) {
            // Render chart and valuation with results
            $('.maincontent').empty();
            renderElements($('#results-template'), results);
            createChart($('#chart-container'), results);
        });
    });

    // On click of "about," show the about section.
    $('.introcontent').on('click', '#about', function (e) {
        $('.maincontent').empty();
        if ($('#about-container').length === 0) { 
            renderElements($('#about-template'));
            setTimeout( function () {
                showElements($('#about-container'));
            }, 0 );
        }
    });

    // On click of "clear," clear the main container.
    $('.introcontent').on('click', '#clear', function (e) {
        $('.maincontent').empty();
    });

});
