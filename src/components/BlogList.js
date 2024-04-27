import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import '../styles/BlogList.css'; // Import your CSS for styling

const BlogList = ({ fileNames }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const postsData = await Promise.all(
          fileNames.map(async (fileName) => {
            try {
              const response = await fetch(`/blogs/${fileName}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch ${fileName}`);
              }
              const content = await response.text();
              const metadata = parseMetadata(content);
              return {
                fileName,
                ...metadata
              };
            } catch (error) {
              console.error(`Error fetching ${fileName}:`, error);
              return {
                fileName,
                title: 'Untitled', // Default title
                date: 'Unknown', // Default date
                excerpt: 'No excerpt available', // Default excerpt
              };
            }
          })
        );
        setBlogPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error);
      }
    };

    fetchBlogPosts();
  }, [fileNames]);

  const parseMetadata = (content) => {
    // Parse metadata from markdown content
    const lines = content.split('\n');
    let metadata = {};
    for (const line of lines) {
      if (line.startsWith('Category:')) {
        metadata.category = line.replace('Category:', '').trim();
      } else if (line.startsWith('Date:')) {
        metadata.date = line.replace('Date:', '').trim();
      }
    }
    return metadata;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="main-content">
              <h1>Blog</h1>
              <ul className="post-list">
                {blogPosts.map((post, index) => (
                  <li key={index} className="post">
                    <h2 className="post-title">
                      <Link to={`/blog/${post.fileName}`}>{post.title}</Link>
                    </h2>
                    <p className="post-date">{post.date}</p>
                    <p className="post-excerpt">{post.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>         
        </div>
      </div>
    </Router>
  );
};

export default BlogList;
