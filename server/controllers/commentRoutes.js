const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// create a comment (authed)
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json({ ok: true, data: { comment: newComment } });
  } catch (err) {
    res.status(400).json({ ok: false, error: { message: 'Bad request', detail: err } });
  }
});

module.exports = router;
