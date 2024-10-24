import express from "express";
import sqlite3 from "sqlite3";
import { medicamentObj } from "./interface";
// import path from 'node:path';
// import { fileURLToPath } from "node:url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const verbose = sqlite3.verbose();
const db = new verbose.Database("./mydb", (err) => {
  if (err) {
    return console.log("couldnt connect to the db");
  }
  console.log("connected to the database");
});

db.run(`CREATE TABLE IF NOT EXISTS medicaments(
    medicament TEXT,
    stock INTEGER,
    qty INTEGER,
    priceSell INTEGER,
    priceBuy INTEGER,
    date TEXT,
    id TEXT
    )`);
app.use(express.json());

// app.get('/delete', (req, res) => {
//   db.run('DELETE FROM medicaments', (err) => {
//     if(err) {
//       console.log(err)
//     }
//   })
//   res.send('welcome')
// })
app.post("/storeMedicament", (req: any, res) => {
  try {
    const medicament: medicamentObj = req.body;
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
      (err: any, row: any) => {
        if (err) {
          return console.log(err);
        }
        console.log("row inserted ", row);
        res.status(200).json({ message: "inserted" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateMed", (req, res) => {
  try {
    const updateMed: medicamentObj = req.body;
    console.log(updateMed);
    const { stock, qty, id } = updateMed;
    console.log("updating");
    db.run(
      `UPDATE medicaments SET stock = ?, qty = ? WHERE id = ? `,
      [stock, qty, id],
      (err) => {
        if (err) {
          return console.log(err);
        }
        res.status(200).json({ message: "sucess" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.get("/getMedicament", (req, res) => {
  const smth = req?.body;
  console.log(smth);
  try {
    db.all(
      "SELECT medicament,stock,qty,priceSell,priceBuy,date,id FROM medicaments WHERE stock > 0",
      (err, row) => {
        if (err) {
          console.log(err);
          return res.send("error mate");
        }
        // console.log("here's your row ", row);
        res.status(200).json(row);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get('/statistics', (req, res) => {
  try {
    
  } catch(err) {
    console.log(err)
  }
})

app.get("/limitedMeds", (req, res) => {
  try {
    db.all(
      "SELECT medicament,stock,qty,priceSell,priceBuy,date,id FROM medicaments WHERE stock - qty < 10",
      (err, row) => {
        if (err) {
          return console.log(err);
        }
        console.log(row)
        return res.status(200).json(row)
      }
    );
  } catch (err) {
    console.log(err);
  }
});
// app.use('/images', express.static('images'))
// app.use(express.static('dist'))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
// })

app.listen(PORT, () => {
  console.log("app is listening on the port", PORT);
});

("CREATE TABLE IF NOT EXISTS");
