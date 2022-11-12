const express = require("express");
const figureRoute = express.Router();
const mysql = require("mysql");

var fs = require("fs");

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "figure",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL database = ", err);
    return;
  }
  console.log("MySQL successfully connected!");
});

// file upload api
figureRoute.post("/create", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }

  const myFile = req.files.file;
  const fig_name = req.body.name;
  const description = req.body.description;

  try {
    const fig_path = "http://localhost:4000" + "/public/" + myFile.name;
    //  mv() method places the file inside public directory
    myFile.mv(`../backend/public/${myFile.name}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      // return res.send({name: myFile.name, path: `/${myFile.name}`});
      connection.query(
        "INSERT INTO figure(fig_name, fig_description, fig_picpath) VALUES(?, ?, ?)",
        [fig_name, description, fig_path],
        (err, results, fields) => {
          if (err) {
            console.log("Error while inserting a user into the database", err);
            return res.status(400).send();
          }
          return res
            .status(200)
            .json({ message: "create figure successfully created!" });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  // return res.status(200).send({ msg: "OK" })
});

// Get all data
figureRoute.get("/show_data", async (req, res) => {
  try {
    connection.query("SELECT * FROM figure", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get all data
figureRoute.delete("/delete_figure/:id", async (req, res) => {
  const fig_id = req.params.id;
  var fig_picpath = null;

  try {
    connection.query(
      "SELECT fig_picpath FROM figure WHERE fig_id= ?;",
      [fig_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        //  console.log(results[0].fig_picpath);
        fig_picpath = results[0].fig_picpath;
      }
    );

    connection.query(
      "DELETE FROM figure WHERE fig_id= ?;",
      [fig_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        fs.unlink(fig_picpath.substring(22), function (err) {
          if (err) console.log(err);
          console.log("file deleted successfully");
        });

        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
  //   console.log(req.body);
});

module.exports = figureRoute;
