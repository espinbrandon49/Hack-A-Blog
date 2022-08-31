const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

let timer;

const runTimer = () => {
  timer = setTimeout(() => {
    logout()
  }, 60000)
}
runTimer();

function resetLogout() {
  clearTimeout(myTimeout)
}

window.addEventListener('click', (e) => {
  clearTimeout(timer)
  runTimer()
})

window.addEventListener('mousemove', (e) => {
  clearTimeout(timer)
  runTimer()
})

window.addEventListener('scroll', (e) => {
  clearTimeout(timer)
  runTimer()
})

window.addEventListener('keydown', (e) => {
  clearTimeout(timer)
  runTimer()
})

window.addEventListener('keyup', (e) => {
  clearTimeout(timer)
  runTimer()
})
document.querySelector('#logout').addEventListener('click', logout);