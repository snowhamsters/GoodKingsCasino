fetch('/store')
	.then(response => response.json())
	.then(data => {
		document.getElementById('store-item1').innerHTML = data.items[0].name;
		document.getElementById('store-item2').innerHTML = data.items[1].name;
		document.getElementById('store-item3').innerHTML = data.items[2].name;
	})
	.catch(error => console.error('Error fetching store data:', error));