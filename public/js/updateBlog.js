const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id)
    console.log(event.target)
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('click', delButtonHandler);

