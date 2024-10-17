"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', function (req, res) {
    res.send('hey');
});
app.post('/storeMedicament', function (req, res) {
    console.log(req.body);
});
app.listen(PORT, function () {
    console.log('app is listening on ' + PORT);
});
// console.log('hello world')
