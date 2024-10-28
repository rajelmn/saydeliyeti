import express from "express";
import Database from "better-sqlite3";
// import sqlite3 from "sqlite3";
import { medicamentObj } from "./interface";
import { format } from "date-fns";
import path from 'node:path';
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
// const verbose = sqlite3.verbose();
const db = new Database("mydb", { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS medicaments(
    medicament TEXT,
    stock INTEGER,
    qty INTEGER,
    priceSell INTEGER,
    priceBuy INTEGER,
    date TEXT,
    id TEXT
    )`);

db.exec(`CREATE TABLE IF NOT EXISTS statistics(
  date TEXT unique,
  qty INTEGER DEFAULT 0,
  profits INTEGER DEFAULT 0,
  sold INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  salesTotal INTEGER DEFAULT 0
  )`);
app.use(express.json());
// app.use(cors())
app.get("/delete", (req, res) => {
  db.prepare("DELETE FROM medicaments");
  res.send("welcome");
});

app.post("/storeMedicament", (req: any, res) => {
  try {
    const medicaments: medicamentObj = req.body;
    const { medicament, stock, qty, priceSell, priceBuy, date, id } =
      medicaments;
    const insertData = db.prepare(
      "INSERT INTO medicaments Values(?, ?, ?, ?, ?, ?, ?)"
    );
    insertData.run(medicament, stock, qty, priceSell, priceBuy, date, id);
  } catch (err) {
    console.log(err);
  }
});

app.get('/', (req, res) => {
  res.send({message: "hey"})
})

app.post("/updateMed", (req, res) => {
  try {
    const formattedDate = format(new Date(), "yyyy-MM-dd");

    const updateMed: medicamentObj = req.body;
    const { soldQty }: { soldQty: number } = req.body;
    const { stock, qty, id, date, priceBuy, priceSell } = updateMed;
    console.log(formattedDate, date);
    console.log(formattedDate === date);
    console.log("updating");
    const update = db.prepare(
      "UPDATE medicaments SET stock = ?, qty = ? WHERE id = ?"
    );
    const updatedMed = update.run(stock, qty, id);
    const updateStatistics =
      db.prepare(`INSERT INTO statistics (date, qty, salesTotal,profits, sold) VALUES (@date, @qty ,@salesTotal,@profits, @sold) 
    ON CONFLICT(date) DO UPDATE SET
    date = @date,
    qty = qty + @qty, 
    profits = profits + @profits, 
    sold = sold + @sold,
    salesTotal = salesTotal + @salesTotal,
    purchases = purchases
`);

    // updateStatistics.run(date, qty, (priceSell - priceBuy) * qty, qty);
    updateStatistics.run({
      date: formattedDate,
      qty: qty - soldQty,
      profits: (priceSell - priceBuy) * soldQty,
      sold: soldQty,
      salesTotal: soldQty * priceSell,
    });
    res.status(200).json(updatedMed);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getMedicament", (req, res) => {
  const smth = req?.body;
  console.log(smth);
  try {
    const getMeds = db
      .prepare("SELECT * FROM medicaments where stock - qty > 0")
      .all();
    res.status(200).json(getMeds);
  } catch (err) {
    console.log(err);
  }
});

app.post("/statistics", (req, res) => {
  const {date}: {date: string} = req.body;
  console.log(req.body)
  console.log(date)
  const query = db.prepare("SELECT * FROM statistics WHERE date = ?")
  const stats = query.get(date);
  console.log(stats);
  res.status(200).json(stats);
});

app.get("/limitedMeds", (req, res) => {
  try {
    const limitedMeds = db
      .prepare("SELECT * FROM medicaments where stock - qty > 0")
      .all();
    res.status(200).json(limitedMeds);
  } catch (err) {
    console.log(err);
  }
});
app.use('/images', express.static('images'))
app.use(express.static('dist'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
})

app.listen(PORT, () => {
  console.log("app is listening on the port", PORT);
});
