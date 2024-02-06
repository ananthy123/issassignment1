AOS.init();

AOS.init({
  offset: 120,
  delay: 0,
  duration: 700,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

document.getElementById('blogLink1').addEventListener('click', function(event) {
  openBlogInNewTab('blog1');
});

document.getElementById('blogLink2').addEventListener('click', function(event) {
  openBlogInNewTab('blog2');
});

function openBlogInNewTab(blogId) {
  const blogContent = document.getElementById(blogId).innerHTML;

  const newTab = window.open('');
  newTab.document.write(`
    <html>
      <head>
        <title>${blogId}</title>
        <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="./assets/css/style.css">
        <style>
          /* Add your custom styles for the redirected blog here */
          body {
            font-family: 'Arial', sans-serif;
            background-color: #033f47;
            color: #fff;
            margin: 20px;
          }

          .blog-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #b6cbce;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .blog-title {
            font-size: 24px;
            color: #007bff;
          }

          .blog-content p {
            line-height: 1.6;
            margin-bottom: 15px;
          }

          .blog-like-btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 5px;
          }

          .blog-like-btn:hover {
            background-color: #0056b3;
          }

          /* Light mode styles */
          body.light-mode {
            background-color: var(--color-base2-inverse);
            color: var(--color-body-inverse);
            font-family: var(--font-base);
          }

          .blog-container.light-mode {
            background-color: var(--color-base-inverse);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }

          .blog-title.light-mode {
            color: var(--color-brand);
          }

          .blog-content p.light-mode {
            color: var(--color-body-inverse);
          }

          /* Add more styles as needed */
        </style>
      </head>
      <body>
        <div class="blog-container light-mode">
          ${blogContent}
        </div>
        <script src="./assets/js/bootstrap.bundle.min.js"></script>
        <script src="./assets/js/aos.js"></script>
        <script src="./assets/js/main.js"></script>
      </body>
    </html>
  `);
  newTab.document.title = `Blog ${blogId}`;
  event.preventDefault();
}

function retrieveData(blogId) {
  const likeCount = localStorage.getItem(`likeCount${blogId}`);
  const comments = JSON.parse(localStorage.getItem(`comments${blogId}`)) || [];

  document.getElementById(`likeCount${blogId}`).innerText = likeCount || 0;
  const commentList = document.getElementById(`commentList${blogId}`);
  commentList.innerHTML = comments.map(comment => `<li>${comment}</li>`).join('');
}

function likeBlog(blogId, event) {
  const likeCountElement = document.getElementById(`likeCount${blogId}`);
  const likeCount = parseInt(likeCountElement.innerText) || 0;
  likeCountElement.innerText = likeCount + 1;

  localStorage.setItem(`likeCount${blogId}`, likeCount + 1);

  event.preventDefault();
  event.stopPropagation();
}

function addComment(blogId) {
  const commentInput = document.getElementById(`commentInput${blogId}`);
  const commentList = document.getElementById(`commentList${blogId}`);
  const comments = JSON.parse(localStorage.getItem(`comments${blogId}`)) || [];
  comments.push(commentInput.value);
  localStorage.setItem(`comments${blogId}`, JSON.stringify(comments));

  commentList.innerHTML = comments.map(comment => `<li>${comment}</li>`).join('');
  commentInput.value = '';
  event.stopPropagation();
}

window.onload = function () {
  retrieveData(1);
  retrieveData(2);
};

const modeSwitch = document.getElementById('modeSwitch');
const modeLabel = document.getElementById('modeLabel');
const body = document.body;

document.addEventListener('DOMContentLoaded', function () {
  // Check if there is a saved mode preference in local storage
  const savedMode = localStorage.getItem('mode');
  const modeSwitch = document.getElementById('modeSwitch');
  const lightModeStyles = document.getElementById('lightModeStyles');

  // Apply the saved mode or default to dark mode
  if (savedMode === 'light') {
      document.body.classList.add('light-mode');
      modeSwitch.checked = true;
      lightModeStyles.removeAttribute('disabled');
  } else {
      document.body.classList.remove('light-mode');
      modeSwitch.checked = false;
      lightModeStyles.setAttribute('disabled', true);
  }

  // Toggle between dark mode and light mode
  modeSwitch.addEventListener('change', function () {
      if (modeSwitch.checked) {
          document.body.classList.add('light-mode');
          lightModeStyles.removeAttribute('disabled');
          localStorage.setItem('mode', 'light');
      } else {
          document.body.classList.remove('light-mode');
          lightModeStyles.setAttribute('disabled', true);
          localStorage.setItem('mode', 'dark');
      }
  });
});


function clearBlogData(blogId) {
  localStorage.removeItem(`likeCount${blogId}`);
  localStorage.removeItem(`comments${blogId}`);
  retrieveData(blogId);
  event.stopPropagation();
}
