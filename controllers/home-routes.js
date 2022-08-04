const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({});
    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;

//test create user
// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({});
//     console.log(userData)
//     ('JSDGRFVSEDBGFVPIBDSAUFGVA[DS;UJADS;FVU JUASDB')
//     // Serialize data so the template can read it
//     const users = userData.map((user) => user.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { users });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
