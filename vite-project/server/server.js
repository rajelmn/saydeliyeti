"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sqlite3_1 = require("sqlite3");
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
var __dirname = node_path_1.default.dirname(__filename);
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
var verbose = sqlite3_1.default.verbose();
var db = new verbose.Database("./mydb", function (err) {
    if (err) {
        return console.log("couldnt connect to the db");
    }
    console.log("connected to the database");
});
app.use(express_1.default.json());
app.post("/storeMedicament", function (req, res) {
    try {
        var medicament = req.body;
        console.log(medicament);
        db.run("INSERT INTO medicaments Values(?, ?, ?, ?, ?, ?, ?)", [
            medicament.medicament,
            medicament.stock,
            medicament.qty,
            medicament.priceSell,
            medicament.priceBuy,
            medicament.date,
            medicament.id,
        ], function (err, row) {
            if (err) {
                return console.log(err);
            }
            console.log("row inserted ", row);
        });
    }
    catch (err) {
        console.log(err);
    }
});
app.post("/updateMed", function (req, res) {
    try {
        var updateMed = req.body;
        console.log(updateMed);
        var stock = updateMed.stock, qty = updateMed.qty, id = updateMed.id;
        console.log("updating");
        db.run("UPDATE medicaments SET stock = ?, qty = ? WHERE id = ? ", [stock, qty, id], function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
app.get("/getMedicament", function (req, res) {
    try {
        db.all("SELECT medicament,stock,qty,priceSell,priceBuy,date,id FROM medicaments WHERE stock > 0", function (err, row) {
            if (err) {
                console.log(err);
                return res.send("error mate");
            }
            // console.log("here's your row ", row);
            res.status(200).json(row);
        });
    }
    catch (err) {
        console.log(err);
    }
});
app.use('/images', express_1.default.static('images'));
app.use(express_1.default.static('dist'));
app.get('*', function (req, res) {
    res.sendFile(node_path_1.default.join(__dirname, '..', 'dist/index.html'));
});
app.listen(PORT, function () {
    console.log("app is listening on the port", PORT);
});
// db.run(`CREATE TABLE IF NOT EXIST medicaments(
//     medicament TEXT,
//     stock INTEGER,
//     qty INTEGER,
//     priceSell INTEGER,
//     priceBuy INTEGER,
//     date TEXT,
//     id TEXT
//     )`);
