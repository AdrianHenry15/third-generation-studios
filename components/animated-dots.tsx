import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";

const AnimatedDots = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mousePos = useRef({ x: 0, y: 0 }); // Store mouse position

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const dots: Dot[] = [];
        const numberOfDots = window.innerWidth > 1000 ? 500 : 200; // Dynamically set based on screen size

        // Resize the canvas to match the window dimensions
        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        // Track mouse movement
        const handleMouseMove = (event: MouseEvent) => {
            const handleMouseMove = throttle((event: MouseEvent) => {
                mousePos.current.x = event.clientX;
                mousePos.current.y = event.clientY;
            }, 100); // Mouse move event handled every 100ms

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        };

        // Class representing an individual dot (space dust particle)
        class Dot {
            x: number;
            y: number;
            size: number; // Size of the particle
            alpha: number; // Opacity for fade effect
            speed: number; // Speed of particle movement
            angle: number; // Angle for circular movement
            radius: number; // Distance from the center
            centerX: number; // X-coordinate of the center of rotation (middle of page)
            centerY: number; // Y-coordinate of the center of rotation (middle of page)
            constructor() {
                // Initialize dot at a random position within a circular orbit around the page center
                this.centerX = window.innerWidth / 2; // Set center to middle of page
                this.centerY = window.innerHeight / 2; // Set center to middle of page
                this.radius = Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2); // Random radius from the center
                this.angle = Math.random() * Math.PI * 2; // Random initial angle for circular movement
                this.x = this.centerX + this.radius * Math.cos(this.angle);
                this.y = this.centerY + this.radius * Math.sin(this.angle);
                this.size = Math.random() * 2 + 0.5; // Smaller size for dense dust effect
                this.alpha = Math.random() * 0.5 + 0.3; // Randomized opacity for some particles
                this.speed = Math.random() * 0.002 + 0.0005; // Much slower speed for circular motion
            }

            // Draw the dot with a glow effect
            draw() {
                if (!context) return;
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Glow effect to give the particle a shining look
                context.shadowColor = "rgba(255, 255, 255, 0.5)";
                context.shadowBlur = this.size * 2;

                // Apply the main fill for the dot
                context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // Fading opacity
                context.fill();
                context.closePath();
            }

            // Update the position and alpha of the dot for the animation
            update() {
                // Apply circular movement using angle and radius
                this.angle += this.speed; // Increment the angle for circular motion
                this.x = this.centerX + this.radius * Math.cos(this.angle); // Update x position
                this.y = this.centerY + this.radius * Math.sin(this.angle); // Update y position

                // Attraction to the center: gradually decrease the radius (pull towards the center)
                this.radius *= 0.995; // Slowly reduce the radius to simulate gravitational pull

                // If the dot reaches the center, reset it to a new random radius and angle
                if (this.radius < 5) {
                    this.radius = Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2);
                    this.angle = Math.random() * Math.PI * 2;
                }

                // Apply mouse magnet effect
                this.applyMouseAttraction();

                // Draw the updated dot
                this.draw();
            }

            // Attract the dot to the mouse position if it's close enough
            applyMouseAttraction() {
                const mouseDistance = Math.sqrt(Math.pow(this.x - mousePos.current.x, 2) + Math.pow(this.y - mousePos.current.y, 2));

                // If the dot is within 100px of the mouse, attract it towards the mouse
                if (mouseDistance < 100) {
                    const attractionStrength = 0.05;
                    this.x += (mousePos.current.x - this.x) * attractionStrength;
                    this.y += (mousePos.current.y - this.y) * attractionStrength;
                }
            }
        }

        // Initialize dots array
        for (let i = 0; i < numberOfDots; i++) {
            dots.push(new Dot());
        }

        // Main animation loop
        const animateDots = () => {
            if (!context || !canvas) return;

            // Clear the canvas slightly to create a "trail" effect
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.05)"; // Semi-transparent black for the trail
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Update each dot's position and appearance
            dots.forEach((dot) => dot.update());

            // Continue animating using requestAnimationFrame
            requestAnimationFrame(animateDots);
        };

        // Set initial canvas size and start the animation
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas); // Handle window resizing
        window.addEventListener("mousemove", handleMouseMove); // Track mouse movement

        animateDots();

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="dots-canvas" />;
};

export default AnimatedDots;
