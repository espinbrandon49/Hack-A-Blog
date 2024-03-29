const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#user-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ name, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
console.log(response)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Username and Password must be 8 characters in length')
      console.log(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);