// IMPORTANDO LO QUE NECESITO PARA LA CONEXION/API: express, cors, bodyparser, mysql //

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// JSONWEBTOKEN DEPENDENCIAS //

const jwt = require("jsonwebtoken");
const config = require("./config");

// DECLARO LA APP //

const app = express();

// APP USES //

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("llave", config.llave);

// DATOS DE CONEXION //

const connection = mysql.createConnection({
  host: "localhost",
  user: "bmontans",
  password: "password",
  database: "clientes",
});

// CONEXION //

connection.connect((error) => {
  if (error) throw error; //SI HAY ERROR //
  console.log("DATABASE UP"); // SI NO HAY ERROR //
});

// PUERTO DE LA API //
const PORT = 3050;

app.listen(PORT, () => console.log("VIVA EL JAVASCRIPT"));

// LLAMADA DE PRUEBA //

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM lista_clientes";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No hay clientes");
    }
  });
});

// FUNCION PARA CREAR CLIENTES //
app.get("/", (req, res) => {
  res.send("Hola");
});

app.post("/add", (req, res) => {
  const sql = "INSERT INTO lista_clientes SET ?";
  const newClient = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    ciudad: req.body.ciudad,
    empresa: req.body.empresa,
  };

  connection.query(sql, newClient, (error) => {
    if (error) throw error;
    res.send("Cliente creado");
  });
});

app.delete("/clientes/del/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM lista_clientes WHERE id=${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Cliente borrado.");
  });
});

app.delete("/clientes/del/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM lista_clientes WHERE id=${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Cliente borrado.");
  });
});

// METODO LOGIN QUE CREA EL TOKEN //
app.post("/auth", (req, res) => {
  // DATOS QUE LLEGAN, USER Y PASSWORD //
  const usuario = req.body.usuario;
  const password = req.body.password;

  // SECUENCIA SQL //

  const sql = `SELECT * FROM usuarios WHERE usuario='${usuario}' AND password='${password}'`;

  // CONEXION A LA BBDD //
  connection.query(sql, (error, results) => {
    let admin = null;
    if (error) throw error;
    if (results.length > 0) {
      const payload = {
        check: true,
      };
      if (results[0].isAdmin === 1) {
        admin = true;
      } else {
        admin = false;
      }
      const token = jwt.sign(payload, app.get("llave"), {
        expiresIn: "5 days",
      });
      res.json({
        mensaje: "Autenticación correct",
        token: token,
        isAdmin: admin,
      });
    } else {
      console.log("Datos incorrectos");
    }
  });

  /*
  if (usuario === "admin" && password === "admin") {
    const payload = { check: true };
    const token = jwt.sign(payload, app.get("llave"), {
      expiresIn: "5 days",
    });
    res.json({
      mensaje: "Te has autenticado correctamente",
      token: token,
    });
    console.log(token);
  } else {
    console.log("Datos incorrectos");
  }*/
});
