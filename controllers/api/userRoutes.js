const router = require('express').Router();
const { User } = require('../../models');

//retrieves user data from session storage
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(userData)
    //user is logged in if they are in session storage
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

//fact checking user credentials
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    console.log(userData)
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

module.exports = router;