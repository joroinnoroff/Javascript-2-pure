const API_HOST_URL = "https://nf-api.onrender.com";
const API_BASE = "/api/v1";
const API_SOCIAL_BASE = "/social";
const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

/**
 * Fetch and display user info and posts
 */
const fetchAndDisplayData = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const profile = localStorage.getItem('profile');

  // Redirect to login page if no access token is found
  if (!accessToken || !profile) {
    window.location.href = '/';
    return;
  }

  displayUserInfo(JSON.parse(profile));
  await fetchAndDisplayPosts(accessToken);
};

/**
 * Display user info
 * @param {Object} user - User profile object
 */
const displayUserInfo = (user) => {
  const userInfo = document.getElementById('userInfo');

  let avatarHTML = '';
  if (user.avatar) {
    avatarHTML = `<p><strong>Avatar:</strong> <img src="${user.avatar}" alt="Avatar" width="50" height="50"></p>`;
  }

  userInfo.innerHTML = `
    <h2>Welcome, ${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    ${avatarHTML}
    <button id="signOutButton">Sign out</button>
  `;

  document.getElementById('signOutButton').addEventListener('click', signOut);
};

 
const signOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('profile');
  window.location.href = '/';
};

/**
 * Fetch and display posts
 * @param {string} accessToken - The access token for authorization
 */
const fetchAndDisplayPosts = async (accessToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(`${API_SOCIAL_URL}/posts`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    renderPosts(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    alert('Failed to fetch posts. Please check the console for details.');
  }
};

/**
 * Render posts on the page
 * @param {Array} posts  
 */
const renderPosts = (posts) => {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';

  if (posts.length === 0) {
    postsContainer.innerHTML = '<p>No posts available.</p>';
    return;
  }

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Comments:</strong> ${post._count.comments}</p>
      <p><strong>Reactions:</strong> ${post._count.reactions}</p>
      <p><strong>Created at:</strong> ${new Date(post.created).toLocaleString()}</p>
    `;
    postsContainer.appendChild(postElement);
  });
};

 
window.addEventListener('DOMContentLoaded', fetchAndDisplayData);
