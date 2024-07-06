document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blog-form');
    const blogList = document.getElementById('blog-list');
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const newBlogSection = document.getElementById('new-blog');

    const adminUsername = 'admin';
    const adminPassword = 'password123';

    function loadBlogs() {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogList.innerHTML = '';
        blogs.forEach((blog, index) => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');
            
            const blogTitle = document.createElement('h3');
            blogTitle.textContent = blog.title;
            
            const blogContent = document.createElement('p');
            blogContent.textContent = blog.content;
            
            const actions = document.createElement('div');
            actions.classList.add('actions');
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteBlog(index);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => {
                editBlog(index);
            });
            
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            
            blogPost.appendChild(blogTitle);
            blogPost.appendChild(blogContent);
            blogPost.appendChild(actions);
            
            blogList.appendChild(blogPost);
        });
    }

    function saveBlogs(blogs) {
        localStorage.setItem('blogs', JSON.stringify(blogs));
        loadBlogs();
    }

    function deleteBlog(index) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.splice(index, 1);
        saveBlogs(blogs);
    }

    function editBlog(index) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const blog = blogs[index];
        document.getElementById('title').value = blog.title;
        document.getElementById('content').value = blog.content;

        blogForm.removeEventListener('submit', addBlog);
        blogForm.addEventListener('submit', function updateBlog(e) {
            e.preventDefault();
            blogs[index].title = document.getElementById('title').value;
            blogs[index].content = document.getElementById('content').value;
            saveBlogs(blogs);
            blogForm.reset();
            blogForm.removeEventListener('submit', updateBlog);
            blogForm.addEventListener('submit', addBlog);
        });
    }

    function addBlog(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        if (title && content) {
            const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
            blogs.push({ title, content });
            saveBlogs(blogs);
            blogForm.reset();
        }
    }

    function checkAdminLogin(username, password) {
        return username === adminUsername && password === adminPassword;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (checkAdminLogin(username, password)) {
            loginSection.classList.add('hidden');
            newBlogSection.classList.remove('hidden');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    blogForm.addEventListener('submit', addBlog);
    loadBlogs();
});
