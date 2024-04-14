const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
// ejs and views for ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
// static express files
app.use(express.static('public'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// body parser
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
});

// Gets a json file
let storeJSON = require('./public/json/store-info.json');
let contactJSON = require('./public/json/contact-info.json');

app.get("/store-info", (req, res) => {
    res.json(storeJSON);
});

app.get("/contact-info", (req, res) => {
    res.json(contactJSON);
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/games", (req, res) => {
    res.render("games");
});

app.get("/games/play", (req, res) => {
    res.status(404).send(req.query.id + " Coming Soon");
});

app.get("/roulette", (req, res) => {
    res.render("roulette");
});

app.post("/get/tokens", (req, res) => {
    const username = req.body.username;

    const sql = "SELECT tokens FROM users WHERE username = $1";
    const data = [username];

    pool.query(sql, data, (error, results) => {
        if (error) {
            console.error("Error selecting tokens:", error);
            res.status(500).json({error: "Error selecting tokens"});
            return;
        }

        if (results.rows.length === 0) {
            res.status(404).json({error: "User not found"});
            return;
        }

        res.status(200).json({message: results.rows[0].tokens});
    });
});

app.post("/update/tokens", (req, res) => {
    const username = req.body.username;
    const tokens = parseInt(req.body.tokens);

    const sql1 = "SELECT tokens FROM users WHERE username = $1";
    const data1 = [username];

    pool.query(sql1, data1, (error1, results1) => {
        if (error1) {
            console.error("Error selecting tokens:", error1);
            res.status(500).json({error: "Error selecting tokens"});
            return;
        }

        if (results1.rows.length === 0) {
            res.status(404).json({error: "User not found"});
            return;
        }

        const currentTokens = parseInt(results1.rows[0].tokens);
        const newTokens = currentTokens + tokens;

        const sql2 = "UPDATE users SET tokens = $2 WHERE username = $1";
        const data2 = [username, newTokens];

        pool.query(sql2, data2, (error2, results2) => {
            if (error2) {
                console.error("Error updating tokens:", error2);
                res.status(500).json({ error: "Error updating tokens" });
                return;
            }

            res.status(200).json(results2.rows);
        });
    });
});

app.get("/store", (req, res) => {
    res.render("store");
});

app.get("/purchase", (req, res) => {
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

app.post("/signup/user", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const sql1 = "SELECT username FROM users WHERE username = $1";
    const data1 = [username];

    pool.query(sql1, data1, (error1, results1) => {
        if (error1) throw error1;

        if (results1.rows.length !== 0) {
            res.status(200).json({message: "Duplicate Username"});
            return;
        }
        else {
            const sql2 = "INSERT INTO users (email, username, password, tokens) VALUES ($1, $2, $3, 5)";
            const data2 = [email, username, password];
        
            pool.query(sql2, data2, (error2, results2) => {
                if (error2) throw error2;
        
                res.status(200).json({message: "Success"});
            });
        }
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login/user", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT password FROM users WHERE username = $1";
    const data = [username];

    pool.query(sql, data, (error, results) => {
        if (error) throw error;

        if (results.rows.length === 0) {
            res.status(200).json({message: "User Not Found"});
        }
        else if (results.rows[0].password !== password) {
            res.status(200).json({message: "Incorrect Password"});
        }
        else {
            res.status(200).json({message: "Success"});
        }
    });
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

// Start the server
app.listen(3000, () => {
	console.log("Express started on port 3000");
});