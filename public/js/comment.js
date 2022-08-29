const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to submit comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newCommentHandler);