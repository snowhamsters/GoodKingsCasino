const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'))

app.listen(3000, () => {
	console.log("Express started on port 3000");
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'home.html'));
});

app.get("/store", (req, res) => {
    let storeJSON = require('./json/store-info.json');
    res.json(storeJSON);
});