const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// FEED (NEW) - list blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { model: User, attributes: ['id', 'username', 'name'] },
        { model: Comment, attributes: ['id'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ ok: true, data: { blogs } });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Server error', detail: err } });
  }
});

// DETAIL (NEW) - blog + comments
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username', 'name'] },
        {
          model: Comment,
          attributes: ['id', 'comment', 'createdAt', 'user_id', 'blog_id'],
          include: [{ model: User, attributes: ['id', 'username', 'name'] }],
        },
      ],
    });

    if (!blog) return res.status(404).json({ ok: false, error: { message: 'Blog not found' } });
    res.json({ ok: true, data: { blog } });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Server error', detail: err } });
  }
});

// create blog (dashboard)
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json({ ok: true, data: { blog: newBlog } });
  } catch (err) {
    res.status(400).json({ ok: false, error: { message: 'Bad request', detail: err } });
  }
});

// update blog (dashboard) — FIX: auth + ownership
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updatedCount] = await Blog.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id, user_id: req.session.user_id } }
    );

    if (!updatedCount) {
      return res.status(404).json({ ok: false, error: { message: 'Blog not found or not owned' } });
    }

    res.json({ ok: true, data: { updated: true } });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Server error', detail: err } });
  }
});

// delete blog (dashboard)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedCount = await Blog.destroy({
      where: { id: req.params.id, user_id: req.session.user_id },
    });

    if (!deletedCount) {
      return res.status(404).json({ ok: false, error: { message: 'Blog not found or not owned' } });
    }

    res.json({ ok: true, data: { deleted: true } });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Server error', detail: err } });
  }
});

module.exports = router;
