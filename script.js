// DATA
let posts = [
    {
        id: 1,
        username: 'nature_lover',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        likes: 124,
        caption: 'Beautiful sunset view! 🌅',
        liked: false
    },
    {
        id: 2,
        username: 'tech_guru',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        likes: 89,
        caption: 'Coding late at night 💻',
        liked: false
    }
];

// DOM ELEMENTS
const feedContainer = document.getElementById('feed');
const modal = document.getElementById('postModal');
const addBtn = document.getElementById('add-post-btn');
const cancelBtn = document.getElementById('cancelBtn');
const shareBtn = document.getElementById('shareBtn');
const imageInput = document.getElementById('imageInput');
const captionInput = document.getElementById('captionInput');
const themeToggle = document.getElementById('theme-toggle');

// RENDER FEED
function renderFeed() {
    feedContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const heartClass = post.liked ? 'fas fa-heart liked' : 'far fa-heart';

        postElement.innerHTML = `
            <div class="post-header">
                <img src="https://ui-avatars.com/api/?name=${post.username}&background=random" class="avatar">
                <span class="username">${post.username}</span>
            </div>
            <img src="${post.image}" class="post-image" ondblclick="toggleLike(${post.id})">
            <div class="post-actions">
                <i class="${heartClass}" onclick="toggleLike(${post.id})"></i>
                <i class="far fa-comment"></i>
                <i class="far fa-paper-plane"></i>
            </div>
            <div class="post-likes">${post.likes} likes</div>
            <div class="post-caption">
                <span>${post.username}</span> ${post.caption}
            </div>
        `;
        feedContainer.appendChild(postElement);
    });
}

// LIKE FUNCTION
window.toggleLike = function(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }
        renderFeed();
    }
}

// MODAL LOGIC
addBtn.addEventListener('click', () => modal.style.display = 'flex');
cancelBtn.addEventListener('click', () => modal.style.display = 'none');

// SHARE POST
shareBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    const caption = captionInput.value;

    if (file && caption) {
        const imageUrl = URL.createObjectURL(file);
        
        const newPost = {
            id: Date.now(),
            username: 'you',
            image: imageUrl,
            likes: 0,
            caption: caption,
            liked: false
        };

        posts.unshift(newPost);
        renderFeed();
        
        captionInput.value = '';
        imageInput.value = '';
        modal.style.display = 'none';
    } else {
        alert("Please add an image and a caption!");
    }
});

// DARK MODE TOGGLE
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
});

// INITIAL RENDER
renderFeed();
