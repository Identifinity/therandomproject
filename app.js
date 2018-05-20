const express = require('express')
const ejs = require('ejs')
const app = express()
const mongoose  = require('mongoose')
const DataModel = require('./DataModel')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

mongoose
.connect("mongodb://Interf:passw@ds111319.mlab.com:11319/interftest")
.catch(err => {
  console.log(err);
});

//middleware
app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))
// const urlEncPars = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json())

//routing
app.get("/", (req, res) => {
  res.render("main")
})


app.post("/random", (req, res) => {
  const random = Math.round(Math.random() * 100)
  console.log(req.body.chance);

  if(req.body.chance){
    DataModel.create({ nr: random, date: new Date() }, (err, data) => {
      if(err){
        res.json({error: true})
        return console.error(err)
      }

      DataModel.find({}, (err2, arr) => {
        if(err2) return res.json({error: true})
        return res.json({ results: arr, chance: req.body.chance })
      }).sort({'date': -1}).limit(15)
    })
  } else {
    DataModel.find({}, (err2, arr) => {
      if(err2) return res.json({error: true})
      return res.json({ results: arr, chance: req.body.chance })
    }).sort({'date': -1}).limit(15)
  }
})

app.use((req, res) => {
  res.redirect("/")
})

//server listener
app.listen(port)
