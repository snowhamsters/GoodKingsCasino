$(function() {
	$.get('/contact-info', function(response) {
        let contactInfo = $('#contact-info');
        let contactHTML = '<p>' + response.name + '</p>' +
                '<p>' + response.email + '</p>' +
                '<p>' + response.phone + '</p>' +
                '<p>' + response.address + '</p>' +
                '<p>' + "Website: " + '<a href=' + response.website + '>' + "www.GoodKingsCasino.com" + '</a>' + '<p>';
        contactInfo.append(contactHTML);
		// Not necessary, but for testing
        console.log(response);
	});
});