import { register } from "../../register/index";

// Define the regex pattern for validating @stud.noroff.no email addresses
const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;

export const handleRegisterFormSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  // Extract email from the profile data
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
