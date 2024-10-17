import express from "express";
import sqlite3 from "sqlite3";
interface Item {
  medicament: string;
  stock: number;
  qty: number;
  priceSell: number;
  priceBuy: number;
  date: string;
  id: string;
}

const app = express();
const PORT = process.env.PORT || 3000;
const verbose = sqlite3.verbose();
const db = new verbose.Database("./mydb", (err) => {
  if (err) {
    return console.log("couldnt connect to the db");
  }
  console.log("connected to the database");
});

app.use(express.json());


app.post("/storeMedicament", (req, res) => {
    try {
        const medicament: Item = req.body;
        console.log(medicament);
        db.run(
            "INSERT INTO medicaments Values(?, ?, ?, ?, ?, ?, ?)",
      [
        medicament.medicament,
        medicament.stock,
        medicament.qty,
        medicament.priceSell,
        medicament.priceBuy,
        medicament.date,
        medicament.id,
      ],
      (err, row) => {
        if (err) {
            return console.log(err);
        }
        console.log("row inserted ", row);
    }
);
  } catch (err) {
      console.log(err);
    }
});


const query = 'SELECT medicament,stock,qty,priceSell,priceBuy,date,id FROM medicaments'
app.get("/getMedicament", (req, res) => {
    try {
        db.all(query, (err, row) => {
            if (err) {
                console.log(err);
                return res.send("error mate");
            }
            console.log("here's your row ", row);
            res.status(200).json(row);
        });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
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