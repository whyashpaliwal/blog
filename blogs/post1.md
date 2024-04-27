<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Content from Markdown</title>
    <style>
        /* Add your CSS styles here */
    </style>
</head>
<body>
    <!-- Container for the dynamic content -->
    <div id="dynamicContentContainer"></div>

    <script>
        // Function to fetch and render Markdown content
        async function fetchAndRenderMarkdown(fileNames) {
            const converter = new showdown.Converter();
            
            // Iterate over the array of file names
            for (const fileName of fileNames) {
                try {
                    // Fetch Markdown content from the file
                    const response = await fetch(`./blogs/${fileName}.md`);
                    const markdownText = await response.text();

                    // Split metadata and content
                    const [metadata, content] = markdownText.split('---').filter(Boolean);

                    // Parse metadata
                    const metadataLines = metadata.split('\n');
                    const metadataObj = {};
                    metadataLines.forEach(line => {
                        const [key, value] = line.split(':').map(item => item.trim());
                        metadataObj[key] = value;
                    });

                    // Convert Markdown content to HTML
                    const htmlContent = converter.makeHtml(content);

                    // Render the HTML content with metadata
                    const formattedHTML = `
                        <div class="blog-post">
                            <h2>${metadataObj.title}</h2>
                            <p>Author: ${metadataObj.author}</p>
                            <p>Date: ${metadataObj.date}</p>
                            <div class="content">${htmlContent}</div>
                        </div>
                    `;
                    document.getElementById('dynamicContentContainer').innerHTML += formattedHTML;
                } catch (error) {
                    console.error(`Error fetching or rendering Markdown from ${fileName}.md:`, error);
                }
            }
        }

        // Call the function to fetch and render Markdown content
        const fileNames = ['post1', 'post2']; // Example array of file names
        fetchAndRenderMarkdown(fileNames);
    </script>

    <!-- Include the Showdown library for Markdown conversion -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js"></script>
</body>
</html>
