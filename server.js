const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const app = express()
const connectionString = "mongodb+srv://CobyShinobi:zCrWcD4qnEGcN5LJ@cluster0.dboff.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
      console.log("Connected to Database")
      const db = client.db("star-wars-quotes")
      const quotesCollection = db.collection("quotes")

      app.set("view engine", "ejs")

      app.use(bodyParser.urlencoded({ extended: true }))

      app.get("/", (req, res) => {
          db.collection("quotes").find().toArray()
            .then(results => {
                res.render("index.ejs", {quotes: results})
            })
            .catch(error => console.error(err0r))
      })

      app.post("/quotes", (req, res) => {
          quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect("/")
            })
            .catch(error => console.error(error))
      })

      app.listen(3000, function() {
          console.log("listening on 3000")
      })
    })
    .catch(error => console.error(error))