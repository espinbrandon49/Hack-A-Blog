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
      document.location.reload();
      console.log(comment)
      console.log(blog_id)
    } else {
      alert('Failed to submit comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-Id')) {
    const id = event.target.getAttribute('data-Id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.log('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newCommentHandler);

document
  .querySelector('.commentDiv')
  .addEventListener('click', delButtonHandler);