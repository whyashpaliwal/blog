import React from 'react';
import '../styles/BlogCard.css';

const BlogCard = ({ title, content }) => {
    return (
        <div className="blog-card">
            <h3>{title}</h3>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default BlogCard;
