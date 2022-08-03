// dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

//express
const app = express();

//port heroku/local
const PORT = process.env.PORT || 3001;

//use handlebars as templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//empower express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//connect to PORT
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
});
