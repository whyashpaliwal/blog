import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import AnimatedIllustration from './components/AnimatedIllustration';

const App = () => {
  const [fileNames, setFileNames] = useState([]);
    
  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await fetch('/blog-file-names.json');
        if (!response.ok) {
          throw new Error('Failed to fetch file names');
        }
        const data = await response.json();
        setFileNames(data.fileNames);
      } catch (error) {
        console.error('Error fetching file names:', error);
      }
    };

    fetchFileNames();
  }, []);

  return (
    <div className="App">
      <Header />
      <section className="heading-section">
        <div className="container">
          <div className="heading-content">
            <AnimatedIllustration />
          </div>
        </div>
      </section>
      <BlogList fileNames={fileNames} />
      <Footer />
    </div>
  );
}

export default App;
