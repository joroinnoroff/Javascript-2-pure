import { register } from "../../register/index";

// Define the regex pattern for validating @stud.noroff.no email addresses
const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;

/**
 * Handles the registration form submission, validates the email, and sends data to the API.
 *
 * @param {Event} event - The form submit event.
 */
export const handleRegisterFormSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

 
  const profile = {
    ...Object.fromEntries(formData.entries())
  };

  
  const userEmail = profile.userEmail;

  // Validate the email using regex
  if (!emailPattern.test(userEmail)) {
    alert('Please enter a valid email address ending with @stud.noroff.no');
    return;
  }

  // Define the action and method for the register function
  const action = `${API_SOCIAL_URL}/auth/register`;
  const method = 'POST';

  // Send the profile data to the API
  register(profile, action, method);
};
