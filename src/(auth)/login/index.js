const API_HOST_URL = "https://nf-api.onrender.com";
const API_BASE = "/api/v1";
const API_SOCIAL_BASE = "/social";
const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

/**
 * Handles the login form submission, validates the email, and sends login data to the API.
 *
 * @param {Event} event - The form submit event.
 */
export const handleLoginFormSubmit = async (event) => {
  event.preventDefault();

  // Get the form and form data
  const form = event.target;
  const formData = new FormData(form);

  // Convert FormData to a plain object
  const credentials = Object.fromEntries(formData.entries());

  // Extract email and password from the credentials
  const { email, password } = credentials;

  // Validate email and password (basic validation)
  if (!email || !password) {
    alert('Email and password are required.');
    return;
  }

  // Define the action and method for the login function
  const action = `${API_SOCIAL_URL}/auth/login`;
  const method = 'POST';

  try {
    // Send the login data to the API
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result = await response.json();

    // Debugging output
    console.log('Response status:', response.status);
    console.log('Response JSON:', result);

    // Handle successful login
    if (result && result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('profile', JSON.stringify(result));

      alert('Login successful!');
      
      // Optionally redirect or update the UI
      // window.location.href = '/dashboard.html';

      window.location.href = '/AllPosts.html'
    } else {
      throw new Error('Access token not found in response.');
    }

  } catch (error) {
    // Debugging output
    console.error('Login error:', error);
    alert('Login failed. Please check the console for details.');
  }
};

/**
 * Creates an API key and stores it in localStorage.
 *
 * @param {string} accessToken - The access token for authorization.
 */
 
 

// Attach event listener to the login form
document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);
