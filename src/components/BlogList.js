import React, { useEffect, useState } from 'react';
import {showdown} from 'showdown';

const BlogList = ({ fileNames }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            const converter = new showdown.Converter();
            const posts = [];

            for (const fileName of fileNames) {
                try {
                    const response = await fetch(`./blogs/${fileName}.md`);
                    const markdownText = await response.text();

                    const [metadata, content] = markdownText.split('---').filter(Boolean);
                    const metadataObj = {};
                    metadata.split('\n').forEach(line => {
                        const [key, value] = line.split(':').map(item => item.trim());
                        metadataObj[key] = value;
                    });

                    const htmlContent = converter.makeHtml(content);

                    const formattedPost = {
                        title: metadataObj.title,
                        author: metadataObj.author,
                        date: metadataObj.date,
                        content: htmlContent
                    };

                    posts.push(formattedPost);
                } catch (error) {
                    console.error(`Error fetching or rendering Markdown from ${fileName}.md:`, error);
                }
            }

            setBlogPosts(posts);
        };

        fetchBlogPosts();
    }, [fileNames]);

    return (
        <div>
            {blogPosts.map((post, index) => (
                <div key={index} className="blog-post">
                    <h2>{post.title}</h2>
                    <p>Author: {post.author}</p>
                    <p>Date: {post.date}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            ))}
        </div>
    );
};

export default BlogList;