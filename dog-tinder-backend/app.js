var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
var validator = require('express-validator')
var app = express();
var Dog = require('./models').Dog

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())


app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
});

app.get('/dogs', (req, res) => {
  Dog.findAll().then((dogs) =>{
    res.json({dogs:dogs})
  })
});

app.get('/dog/:id', (req, res) =>{
  Dog.findById(req.params["id"])
    .then((dog)=>{
    res.json(dog)
  })
})

app.post('/dogs', (req, res) => {
  req.checkBody('name', 'Is required').notEmpty()
  req.checkBody('age', 'Is required').notEmpty()
  req.checkBody('enjoys', 'Is required').notEmpty()
  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        Dog.create({
          name: req.body.name,
          age: req.body.age,
          enjoys: req.body.enjoys
        }).then((dog)=>{
          res.status(201)
          res.json({dog: dog})
        })
        }else{
          res.status(400)
          res.json({errors: {validations: validationErrors.array()}})
        }
    })
  })

module.exports = app
