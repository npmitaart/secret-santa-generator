const loginButton = document.getElementById('login-button');
const assignedNameOutput = document.getElementById('assigned-name');

// Load participants from localStorage
const participants = JSON.parse(localStorage.getItem('participants') || '{}');

// Participant Login
loginButton.addEventListener('click', () => {
  const name = document.getElementById('login-name').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (participants[name] && participants[name].password === password) {
    assignedNameOutput.innerText = `You have to buy a gift for: ${participants[name].assigned}`;
  } else {
    assignedNameOutput.innerText = 'Invalid name or password.';
  }
});
