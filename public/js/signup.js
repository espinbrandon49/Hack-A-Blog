const signupFormHandler = async (event) => {
  event.preventDefault();

  const nameSignup = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (nameSignup && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ nameSignup, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);