const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
// ejs and views for ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
// static express files
app.use(express.static('public'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Gets a local json file. Needs to be changed to get from a db
let storeJSON = require('./public/json/store-info.json');
let contactJSON = require('./public/json/contact-info.json');

app.get("/store-info", (req, res) => {
    res.json(storeJSON);
});

app.get("/contact-info", (req, res) => {
    res.json(contactJSON);
});

/* Route Handlers */

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/games", (req, res) => {
    res.render("games");
});

app.get("/roulette", (req, res) => {
    res.render("roulette");
});

app.get("/store", (req, res) => {
    res.render("store");
});

app.get("/store/purchase", (req, res) => {
    let itemID = req.query.id;
    let selectedItem = storeJSON.items.find(i => i.id === itemID);
    // If an item in storeJSON has the given id
    if (selectedItem) {
        res.render("purchase", { item: selectedItem });
    }
    else {
        res.status(404).send("Item not found");
    }
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

// Start the server
app.listen(3000, () => {
	console.log("Express started on port 3000");
});