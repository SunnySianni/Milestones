// Get references to form elements
const form = document.getElementById('profileForm');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');
const themeInputs = document.querySelectorAll('input[name="theme"]');

// Load saved profile settings from localStorage on page load
window.addEventListener('load', () => {
    const savedSettings = JSON.parse(localStorage.getItem('userProfile')) || {};
    if (savedSettings.username) usernameInput.value = savedSettings.username;
    if (savedSettings.email) document.getElementById('email').value = savedSettings.email;
    if (savedSettings.theme) {
        document.getElementById(savedSettings.theme).checked = true;
        applyTheme(savedSettings.theme);
    }
});

// Validate the username input (at least 4 characters long)
usernameInput.addEventListener('input', () => {
    if (usernameInput.value.length < 4) {
        usernameError.textContent = 'Username must be at least 4 characters long';
    } else {
        usernameError.textContent = '';
    }
});

// Apply the selected theme when a theme radio button is changed
themeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
});

// Function to apply the selected theme by changing the body's class
function applyTheme(theme) {
    document.body.className = `theme-${theme}`;
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if the username meets the validation criteria
    if (usernameInput.value.length < 4) {
        usernameError.textContent = 'Username must be at least 4 characters long';
        return;
    }

    // Gather the form data
    const formData = new FormData(form);
    const userProfile = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        theme: formData.get('theme')
    };

    // Save the profile data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Profile saved successfully!');
});
