const delButtonHandler = async (event) => {
  console.log('meow')
  if (event.target.hasAttribute('data-id')) {
    console.log('meow')
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('click', delButtonHandler);