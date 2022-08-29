const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
})

//Post a comment
router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    Comment.create({
      comment: req.body.comment,
      blog_Id: req.body.blog_Id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  }
});

//delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;