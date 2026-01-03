const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../middleware/auth');

// create a comment (authed)
router.post('/', withAuth, async (req, res) => {
  try {
    const { comment, blog_id } = req.body;

    if (!comment || !blog_id) {
      return res
        .status(400)
        .json({ ok: false, error: { message: 'comment and blog_id are required' } });
    }

    const blogId = Number(blog_id);
    if (!Number.isInteger(blogId)) {
      return res
        .status(400)
        .json({ ok: false, error: { message: 'blog_id must be an integer' } });
    }

    const newComment = await Comment.create({
      comment,
      blog_id: blogId,
      user_id: req.session.user_id,
    });

    res.status(200).json({ ok: true, data: { comment: newComment } });
  } catch (err) {
    res.status(400).json({ ok: false, error: { message: err.message } });
  }
});

// delete a comment (author only)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res
        .status(404)
        .json({ ok: false, error: { message: 'Comment not found' } });
    }

    if (comment.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ ok: false, error: { message: 'Not authorized to delete this comment' } });
    }

    await comment.destroy();

    res.status(200).json({ ok: true, message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: err.message } });
  }
});

module.exports = router;
