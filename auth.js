// Simple auth simulation stored in localStorage
// Key: 'gadgethubUser' stores logged in user info as JSON string or null

const authButtonsContainer = document.getElementById('auth-buttons');

function isLoggedIn() {
  return localStorage.getItem('gadgethubUser') !== null;
}

function getCurrentUser() {
  const userStr = localStorage.getItem('gadgethubUser');
  return userStr ? JSON.parse(userStr) : null;
}

function renderAuthButtons() {
  authButtonsContainer.innerHTML = '';

  if (isLoggedIn()) {
    // Logged in view: Add Listing + Logout
    const addListingLi = document.createElement('li');
    addListingLi.classList.add('nav-item', 'me-2');
    addListingLi.innerHTML = `<a class="btn btn-outline-primary" href="add-listing.html">Add Listing</a>`;

    const logoutLi = document.createElement('li');
    logoutLi.classList.add('nav-item');
    const logoutBtn = document.createElement('button');
    logoutBtn.classList.add('btn', 'btn-outline-danger');
    logoutBtn.textContent = 'Logout';
    logoutBtn.addEventListener('click', () => {
      logout();
    });
    logoutLi.appendChild(logoutBtn);

    authButtonsContainer.appendChild(addListingLi);
    authButtonsContainer.appendChild(logoutLi);
  } else {
    // Logged out view: Login + Signup
    const loginLi = document.createElement('li');
    loginLi.classList.add('nav-item', 'me-2');
    loginLi.innerHTML = `<a class="btn btn-outline-success" href="login.html">Login</a>`;

    const signupLi = document.createElement('li');
    signupLi.classList.add('nav-item');
    signupLi.innerHTML = `<a class="btn btn-primary" href="signup.html">Signup</a>`;

    authButtonsContainer.appendChild(loginLi);
    authButtonsContainer.appendChild(signupLi);
  }
}

function logout() {
  localStorage.removeItem('gadgethubUser');
  renderAuthButtons();
  // Optionally redirect to homepage or login page
  window.location.href = 'index.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderAuthButtons();
});
