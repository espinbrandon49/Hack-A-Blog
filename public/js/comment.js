const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();
  const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ blog_id, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });



    if (response.ok) {
      // document.location.reload();
      console.log(comment)
      console.log(blog_id)
    } else {
      alert('Failed to submit comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newCommentHandler);