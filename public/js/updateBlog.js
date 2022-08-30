async function editFormHandler(event) {

  const title = document.querySelector('#updateTitle').value;
  const content = document.querySelector('#updateContent').value;
  
  console.log(title, content)

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to edit blog');
    }
  }
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-delId')) {
    const id = event.target.getAttribute('data-delId');

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
  .querySelector('.edit-blog-form')
  .addEventListener('click', editFormHandler);

document
  .querySelector('.edit-blog-form')
  .addEventListener('click', delButtonHandler);