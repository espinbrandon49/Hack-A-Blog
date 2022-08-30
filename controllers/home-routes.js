const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at'],
        }
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single blog from dashboard
router.get('/blog/dashboard/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at']
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('updateBlog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single blog and comment from homepage 
router.get('/blog/comment/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at']
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    if (req.session.logged_in) {
      res.render('comment', {
        ...blog
      })

    } else {
      res.render('login')
      return
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
