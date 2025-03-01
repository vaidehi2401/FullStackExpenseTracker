const toggleForm = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

toggleForm.addEventListener('click', () => {
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Login';
        toggleForm.textContent = "Don't have an account? Sign up";
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
        toggleForm.textContent = "Already have an account? Login";
    }
});