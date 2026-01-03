const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../middleware/auth');

// signup
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ ok: true, data: { user: userData } });
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: { message: 'Bad request', detail: err } });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      return res.status(400).json({ ok: false, error: { message: 'Incorrect username or password' } });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, error: { message: 'Incorrect username or password' } });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ ok: true, data: { user: userData } });
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: { message: 'Bad request', detail: err } });
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

// me (NEW)
router.get('/me', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    res.json({ ok: true, data: { user } });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Server error', detail: err } });
  }
});

module.exports = router;
