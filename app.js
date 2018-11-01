const express = require('express');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers[0])
    res.render('beers', {
      b: beers
    })
  })
  .catch(err => {
    console.log(err)
    res.render('page500')
  })
});

app.get('/random', (req,res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random', {
      beer: beers[0]
    })
  })
})

app.listen(3000, () => {
  console.log("Server on port 3000")
});