const router = require('express').Router();
const { User } = require('../../models');

//retrieves user data from session storage
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
//WHY DOESN'T THIS HAPPEN??
router.post('/login', async (req, res) => {
  console.log(res)
  console.log(req.body.username)
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
   console.log(req.body.username)

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;