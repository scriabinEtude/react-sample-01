const express = require('express')
const app = express()
const port = 5000

const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://escher:escher@boilerplate.2x61l.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send("hello world"))
app.listen(port, ()=>console.log(`port : ${port}`))