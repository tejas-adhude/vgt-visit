const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'places')));


// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  let images = []
  let json_str = fs.readFileSync('./cat_name.json', "utf-8");
  let cat_names = JSON.parse(json_str);

  for (let name in cat_names) {
    let obj = { src: `cat_img/${name}.jpg`, alt: `${name} image`, title: name }
    images.push(obj);
  }
  res.render('index', { images });
})


app.get('/catPlaces', (req, res) => {
  let images = [];
  let name;
  let id_array;
  let id;

  let cat_name = req.query.name;
  let json_str_cat = fs.readFileSync('./cat_name.json', "utf-8");
  let cat_names_obj = JSON.parse(json_str_cat);

  let json_str_places = fs.readFileSync('./places_names.json', "utf-8");
  let places_names = JSON.parse(json_str_places);

  for (let temp in cat_names_obj) {
    if (temp == cat_name) {
      id_array = cat_names_obj[temp];
      break;
    }
  }

  id_array = JSON.parse(id_array);

  id_array.forEach((id) => {
    for (name in places_names) {
      if (places_names[name] == id) {
        break;
      }
    }
    let aboutf = fs.readFileSync(`./places/${id}/about.txt`, "utf-8");
    let obj = { src: `${id}/img.jpg`, alt: `${name} image`, title: name, about: aboutf.slice(0, 200) }
    images.push(obj);
  })
  res.render('index-ct', { images });
});


// Define the route to render the Pug template
app.get('/allplaces', (req, res) => {
  let images = [];

  let json_str = fs.readFileSync('./places_names.json', "utf-8");
  let places_names = JSON.parse(json_str);

  for (let name in places_names) {
    let id = places_names[name];
    name = name.replace(/-/g, ' ')
    let aboutf = fs.readFileSync(`./places/${id}/about.txt`, "utf-8");
    let obj = { src: `${id}/img.jpg`, alt: `${name} image`, title: name, about: aboutf.slice(0, 200) }
    images.push(obj);
  }
  res.render('index-all', { images });
});


app.get('/place', (req, res) => {

  let placename = req.query.name;
  // console.log(`The name of place is "${placename}"`);

  let json_str = fs.readFileSync('./places_names.json', "utf-8");
  let places_names = JSON.parse(json_str);
  let id = places_names[placename];

  let aboutf = fs.readFileSync(`./places/${id}/about.txt`, "utf-8");
  let distancef = fs.readFileSync(`./places/${id}/distance.txt`, "utf-8");
  let splitDistance = distancef.split('\n');
  let byRoadf = splitDistance[0];
  let byRailwayf = splitDistance[1];
  let byAirf = splitDistance[2];

  let historyf = fs.readFileSync(`./places/${id}/history.txt`, "utf-8");

  res.render('index-pl', {
    title: `${placename.replace(/-/g, ' ')}`,
    imageurl: `${id}/img.jpg`,
    about: aboutf,
    byRoad: byRoadf,
    byRailway: byRailwayf,
    byAir: byAirf,
    history: historyf,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
