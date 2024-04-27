document.addEventListener("DOMContentLoaded", function() {
    // Fetch blog posts
    fetchBlogPosts();
});

async function fetchBlogPosts() {
    try {
        // Fetch the list of blog post files
        const response = await fetch('/_posts');
        const fileList = await response.text();
        const jsonFiles = fileList.match(/href="([^"]+\.json)"/g).map(match => match.replace('href="', '').replace('"', ''));

        // Fetch each blog post file individually
        const posts = await Promise.all(jsonFiles.map(async file => {
            const postResponse = await fetch(`/_posts/${file}`);
            return postResponse.json();
        }));

        const blogList = document.getElementById('blog-list');

        posts.forEach(post => {
            const postDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const postHTML = `
                <div class="blog-post">
                    <h2><a href="${post.url}">${post.title}</a></h2>
                    <p class="date">${postDate}</p>
                    <p>${post.excerpt}</p>
                </div>
            `;

            blogList.insertAdjacentHTML('beforeend', postHTML);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}
