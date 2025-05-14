const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 3001;

  //Define mongoose schema:
  const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
  });

  const contact = mongoose.model('contact', contactSchema);


    //Express specific stuff:
    app.use('/static',express.static('static'));//For serving static files:
    app.use(express.urlencoded({ extended: true }));

    //Pug specific stuff:
    app.set('view engine', 'pug');//set the template engine as pug:
    app.set('views', __dirname);

    app.use('/static', express.static(path.join(__dirname, '../static')));

    //Endpoints: 
  app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug');
  });
app.post('/contact', (req, res) => {
  const myData = new contact(req.body);
  myData.save()
    .then(() => {
      res.render('contact.pug', { 
        message: "This item has been saved to the database",
        ...req.body
      });
    })
    .catch((err) => {
      console.error("❌ Error saving to DB:", err);
      res.status(400).send("The item was not saved to the database");
    });
});


  app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug');
  });

    //Starting the server:
    app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });