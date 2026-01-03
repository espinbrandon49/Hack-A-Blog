const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API only
app.use(routes);

// Basic 404 for anything else
app.use((req, res) => {
  res.status(404).json({ ok: false, error: { message: 'Not found' } });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
});
