const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");

const authRoutes = require('./routes/auth')

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/auth/', authRoutes);

let mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

app.get("/", (req, res) => {
    res.send("fuck off")
})

app.listen(process.env.MAIN_SERVER_PORT, (err) => {
    if (err) {
        console.log("Error Occured")
    } else {
        console.log("Connected to the MAIN server");

        mysqlConnection.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("connected to the database");
            }
        })
    }
})