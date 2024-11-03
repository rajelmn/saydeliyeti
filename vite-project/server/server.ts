import express, { NextFunction } from "express";
import Database from "better-sqlite3";
// import sqlite3 from "sqlite3";
import { medicamentObj } from "./interface";
import { format } from "date-fns";
import path from "node:path";
import session from 'express-session'
import { fileURLToPath } from "node:url";
declare module 'express-session' {
  interface SessionData {
    authStatus?: {isAdmin?: boolean , isLoggedIn?: boolean}
  }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database("mydb", {verbose: console.log});

db.exec(`CREATE TABLE IF NOT EXISTS statistics(
  date TEXT unique NOT NULL,
  qty INTEGER DEFAULT 0 NOT NULL,
  profits INTEGER DEFAULT 0 NOT NULL,
  sold INTEGER DEFAULT 0 NOT NULL,
  salesTotal INTEGER DEFAULT 0 NOT NULL
  )`);

  db.exec(`CREATE TABLE IF NOT EXISTS list(
    medicament TEXT NOT NULL,
    stock INTEGER DEFAULT 0 NOT NULL,
    priceSell INTEGER DEFAULT 0 NOT NULL,
    priceBuy INTEGER DEFAULT 0 NOT NULL,
    id TEXT PRIMARY KEY
   )`)


app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie :{
        // httpOnly: true,
        sameSite: "strict",
        // secure: true,
        // maxAge: 1000 * 60 * 20 // 20 minute
    },
  })
)
// app.use(cors())
// function isAuthenticated(req: any , res: any, next: any): void {
//   if(!req.session.authStatus.isLogged) {
//     return res.status(401).json({message: "not authenticated"})
//   }
//   next();
// }

// app.use(isAuthenticated);

app.get('/validateUser', (req, res) => {
  if (req.session.authStatus?.isAdmin === true) {
     res.status(200).json({ isAdmin: true });
     console.log('first')
  }
  
  if (!req.session.authStatus?.isLoggedIn) {
    console.log('second')
     res.status(401).json({ message: "not authorized" });
  }
  
  if (!req.session.authStatus?.isAdmin && req.session.authStatus?.isLoggedIn) {
    console.log('third')
     res.status(200).json({ isAdmin: false });
  }
})
app.post('/login', (req, res) => {
  const userData = req.body;
  if(!userData.password.length || !userData.username.length) {
    res.status(403).json({messagse: "please complete all the required fields"})
  }
  if(userData.password === process.env.ADMIN_PASSWORD && userData.username === process.env.USER) {
    req.session.authStatus = {isAdmin: true, isLoggedIn: true};
    res.status(200).json({message: "admin"})
  }
  else if(userData.password === process.env.ADMIN_PASSWORD && userData.username === process.env.USER) {
    req.session.authStatus = {isAdmin: false, isLoggedIn: true};
    res.status(200).json({message: "worker"})
  }
  else {
    req.session.authStatus = {isAdmin: false , isLoggedIn: false}
    res.status(401).json({message: "wrong password or username"})
  }
})

app.post("/storeMedicament", (req: any, _res) => {
  try {
    const medicaments: medicamentObj = req.body;
    const { medicament, stock, priceSell, priceBuy, date, id } =
      medicaments;
    const insertData = db.prepare(
      "INSERT INTO medicaments Values(?, ?, ?, ?, ?, ?)"
    );
    insertData.run(medicament, stock, priceSell, priceBuy, date, id);
  } catch (err) {
    console.log(err);
  }
});


app.post('/editMed' , (req, res) => {
  const {priceBuy, priceSell, id}= req.body;
  const updatingMed = db.prepare("UPDATE list SET priceBuy = ?, priceSell = ? WHERE id = ?");
  updatingMed.run(+priceBuy, +priceSell, id);
  res.status(200).json({message: 'the field is updated'})
})


app.post("/updateMed", (req, res) => {
  try {
    const formattedDate = format(new Date(), "yyyy-MM-dd");
    // console.log('updating before gta 6')
    const updateMed: medicamentObj = req.body;
    const { soldQty }: { soldQty: number } = req.body;
    const { stock, id, priceBuy, priceSell } = updateMed;

    const update = db.prepare(
      "UPDATE list SET stock = ? WHERE id = ?"
    );
    const updatedMed = update.run(stock, id);
    const updateStatistics =
      db.prepare(`INSERT INTO statistics (date, salesTotal,profits, sold) VALUES (@date ,@salesTotal,@profits, @sold) 
    ON CONFLICT(date) DO UPDATE SET
    date = @date,
    profits = profits + @profits, 
    sold = sold + @sold,
    salesTotal = salesTotal + @salesTotal
`);

    // updateStatistics.run(date, qty, (priceSell - priceBuy) * qty, qty);
    updateStatistics.run({
      date: formattedDate,
      profits: (priceSell - priceBuy) * soldQty,
      sold: soldQty,
      salesTotal: soldQty * priceSell,
    });
    res.status(200).json(updatedMed);
  } catch (err) {
    console.log(err);
  }
});

app.get('/search/:word', (req, res) => {
  const {word} = req.params;
  const searchTerm = `%${word}%`
  // console.log(searchTerm)
  const getWords = db.prepare('SELECT * FROM list WHERE medicament LIKE @param LIMIT 20')
  const searchRes = getWords.all({param: searchTerm});
  res.status(200).json(searchRes)
  // console.log(searchRes)

})

app.get("/getMedicament", (req, res) => {

  try {
    const getMeds = db
      .prepare("SELECT * FROM list LIMIT 100 ")
      .all();
    res.status(200).json(getMeds);
  } catch (err) {
    console.log(err);
  }
});

app.post("/statistics", (req, res) => {
  const { date }: { date: string } = req.body;
  const query = db.prepare("SELECT * FROM statistics WHERE date = ?");
  const stats = query.get(date);
  res.status(200).json(stats);
});

app.get("/limitedMeds", (_req, res) => {
  try {
    const limitedMeds = db
      .prepare("SELECT * FROM list where stock < 10")
      .all();
    res.status(200).json(limitedMeds);
  } catch (err) {
    console.log(err);
  }
});
app.use("/images", express.static("images"));
app.use(express.static("dist"));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"));
});

app.listen(PORT, () => {
  console.log("app is listening on the port", PORT);
});
