import React, { useEffect, useRef } from 'react';
import '../styles/AnimatedIllustration.css'; // Import the CSS file for styling
import CHARACTERS from './characters'; // Import the character set

const AnimatedIllustration = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const NUM_CHARACTERS = 50; // Number of characters
        const CHARACTER_SIZE = 20; // Size of characters in pixels
        const SPEED = 2; // Movement speed of characters

        let characters = [];

        // Initialize animation
        const initAnimation = () => {
            // Create characters
            for (let i = 0; i < NUM_CHARACTERS; i++) {
                const character = document.createElement('div');
                character.classList.add('character');
                character.textContent = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                container.appendChild(character);
                characters.push({
                    element: character,
                    x: container.offsetWidth / 2,
                    y: container.offsetHeight / 2,
                    dx: Math.random() * SPEED * 2 - SPEED, // Random initial horizontal velocity
                    dy: Math.random() * SPEED * 2 - SPEED, // Random initial vertical velocity
                });
            }

            // Start animation loop
            animate();
        };

        // Animation loop
        const animate = () => {
            characters.forEach(character => {
                // Update character position
                character.x += character.dx;
                character.y += character.dy;

                // Check for collisions with container boundaries
                if (character.x <= 0 || character.x >= container.offsetWidth - CHARACTER_SIZE) {
                    character.dx *= -1; // Reverse horizontal velocity
                }
                if (character.y <= 0 || character.y >= container.offsetHeight - CHARACTER_SIZE) {
                    character.dy *= -1; // Reverse vertical velocity
                }

                // Update character position
                character.element.style.left = `${character.x}px`;
                character.element.style.top = `${character.y}px`;
            });

            // Request next frame
            requestAnimationFrame(animate);
        };

        // Start animation
        initAnimation();

        // Cleanup function
        return () => {
            // Clean up animation resources if needed
        };
    }, []);

    return (
        <div className="animated-illustration" ref={containerRef}>
            {/* Container for the animation */}
        </div>
    );
};

export default AnimatedIllustration;
