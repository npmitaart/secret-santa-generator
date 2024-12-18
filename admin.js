const generatePasswordsBtn = document.getElementById('generate-passwords');
const passwordsOutput = document.getElementById('passwords-output');

// Backend simulation
let participants = {};

// Generate unique pairs ensuring no one gets their own name
generatePasswordsBtn.addEventListener('click', () => {
  const names = document.getElementById('names').value.split('\n').map(name => name.trim()).filter(Boolean);
  if (names.length < 2) {
    passwordsOutput.innerText = 'Please enter at least two names.';
    return;
  }

  let shuffledNames;
  do {
    shuffledNames = [...names].sort(() => Math.random() - 0.5);
  } while (shuffledNames.some((name, i) => name === names[i]));

  participants = names.reduce((acc, name, index) => {
    const password = Math.random().toString(36).slice(-8); // Generate random password
    acc[name] = { password, assigned: shuffledNames[index] };
    return acc;
  }, {});

  // Display generated passwords
  passwordsOutput.innerHTML = `<h3>Passwords</h3>`;
  passwordsOutput.innerHTML += names.map(name => `<p>${name}: ${participants[name].password}</p>`).join('');

  // Save participants in localStorage for public page access
  localStorage.setItem('participants', JSON.stringify(participants));
});
