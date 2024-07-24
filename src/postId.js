const API_HOST_URL = "https://nf-api.onrender.com";
const API_BASE = "/api/v1";
const API_SOCIAL_BASE = "/social";
const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

const fetchPostDetails = async (postId, accessToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(`${API_SOCIAL_URL}/posts/${postId}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const post = await response.json();
    
   
    
    renderPostDetails(post);
  } catch (error) {
    console.error('Error fetching post details:', error);
    alert('Failed to fetch post details. Please check the console for details.');
  }
};

const renderPostDetails = (post) => {
  const postDetailsContainer = document.getElementById('postDetails');

  if (!post) {
    postDetailsContainer.innerHTML = '<p>Post not found.</p>';
    return;
  }

 
  const title = post.title || 'No Title';
  const body = post.body || 'No Content';
  const authorName = post.author ? post.author.name : 'Unknown Author';
  const comments = post._count ? post._count.comments : '0';
  const reactions = post._count ? post._count.reactions : '0';
  const created = post.created ? new Date(post.created).toLocaleString() : 'Unknown Date';

  postDetailsContainer.innerHTML = `
    <h2>${title}</h2>
    <p>${body}</p>
    <p><strong>Author:</strong> ${authorName}</p>
    <p><strong>Comments:</strong> ${comments}</p>
    <p><strong>Reactions:</strong> ${reactions}</p>
    <p><strong>Created at:</strong> ${created}</p>
  `;
};

const getPostIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
};

window.addEventListener('DOMContentLoaded', () => {
  const postId = getPostIdFromUrl();
  const accessToken = localStorage.getItem('accessToken');

  if (!postId || !accessToken) {
    window.location.href = '/';
    return;
  }

  fetchPostDetails(postId, accessToken);
});
