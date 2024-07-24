const API_HOST_URL = "https://nf-api.onrender.com";
const API_BASE = "/api/v1";
const API_SOCIAL_BASE = "/social";
const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

/**
 * Event listener for form submission
 */
document.getElementById('createPostForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    alert('You must be logged in to create a post.');
    window.location.href = '/';
    return;
  }

  const title = document.getElementById('TitlePost').value.trim();
  const body = document.getElementById('BodyPost').value.trim();
  const tags = document.getElementById('TagsPost').value.trim().split(',');
  const imageUrl = document.getElementById('ImgPost').value.trim();

  const postData = {
    title,
    body,
    tags,
    imageUrl
  };

  try {
    const response = await fetch(`${API_SOCIAL_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert('Post created successfully!');
 
  } catch (error) {
    console.error('Error creating post:', error);
    alert('Failed to create post. Please try again.');
  }
});
