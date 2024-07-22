const API_HOST_URL = "https://nf-api.onrender.com";
const API_BASE = "/api/v1";
const API_SOCIAL_BASE = "/social";
const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;
const action = "/auth/register";
const method = "POST";

// Define the regex pattern for validating @stud.noroff.no email addresses
const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.message || 'An error occurred');
    }

    const result = await response.json();
    console.log(result);

    // Assuming `result` contains a `message` field for success
    const message = result.message || 'Registration successful';
    alert(message);

    return result;
  } catch (error) {
    console.error('Error during registration:', error);
    alert(error.message || 'Registration failed. Please try again.');
    throw error; // Rethrow the error if needed
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const profile = Object.fromEntries(formData.entries());

    // Extract email from profile
    const userEmail = profile.email;

    // Validate the email using regex
    if (!emailPattern.test(userEmail)) {
      alert('Please enter a valid email address ending with @stud.noroff.no');
      return;
    }

    try {
      await register(profile);
    } catch (error) {
      // Error handling is managed within the `register` function
    }
  });
});



let opts = {
  lines: 13,
  length: 28,
  width: 14,
  radius: 42,
  scale: 1,
  corners: 1,
  color: '#000',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute'
};

// Target element where the spinner will be added
let target = document.getElementById('spinner');

// Create and start the spinner
let spinner = new Spinner(opts).spin(target);

// Function to stop and remove the spinner
function stopSpinner() {
  spinner.stop(); // Stop the spinner
  target.innerHTML = ''; // Clear the spinner from the target element
}

// Set a timeout to stop the spinner after 3 seconds (3000 milliseconds)
setTimeout(stopSpinner, 3000);