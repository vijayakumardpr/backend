import express from "express";
import mysql from "mysql2";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "student",
});

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.get("/employee", (req, res) => {
  const q = "SELECT * FROM employee";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/employee", (req, res) => {
  const q =
    "INSERT INTO employee (`firstname`,`lastname`,`dob`,`email`,`phone`,`address`,`city`,`state`,`pincode`,`gender`,`terms`) VALUES (?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.dob,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.pincode,
    req.body.gender,
    req.body.terms,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("employee has been created");
  });
});

app.delete("/employee/:id", (req, res) => {
  const personId = req.params.id;
  const q = " DELETE FROM employee WHERE id = ? ";

  db.query(q, [personId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/view/:id", (req, res) => {
  const personId = req.params.id;
  const q = " SELECT * FROM employee WHERE id = ? ";

  db.query(q, [personId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const q =
    "UPDATE employee SET `firstname`= ?, `lastname`= ?, `dob`= ?, `email`= ?, `phone`= ? ,`address`= ?, `city`= ?,`state`= ?, `pincode`= ?,`gender`= ?,`terms`= ?  WHERE id = ?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.dob,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.pincode,
    req.body.gender,
    req.body.terms,
  ];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("connected to backend!");
});
