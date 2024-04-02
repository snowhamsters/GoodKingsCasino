$(function() {
	// Sends an API call defined in server.js, get('/store-info')
	// is assumed to return a json with all our store information
	$.get('/store-info', function(response) {
		for (let el in response.items) {
			let item = response.items[el];
			// Using bootstrap columns, we include a length of 4. This means every 3 items is a new row
			let column = $('<div class="col-lg-4"></div>');
			// HTML allows us to add formatting, imgs, and links. We can also use classes/ids and edit them in css
			let itemHTML = '<div class="store-item">' +
					'<a href="store/purchase?id=' + item.id + '"> <h4>' + item.name + '</h4> </a>' +
					'<a href="store/purchase?id=' + item.id + '"> <img src="' + item.img + '"/> </a>' +
					'<p>' + item.price + '</p>' +
					'<p>' + item.desc + '</p>' +
					'<br><br><br>' +
					'</div>';
			column.append(itemHTML);
			// By appending each item, this row will have several columns. Although it is 1 row element,
			// there will visually be multiple rows because only 3 columns can exist on each row
			$('#store-item-row').append(column);
		}
		// Not necessary, but for testing
		console.log(response);
	});
});