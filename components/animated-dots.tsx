import { useEffect, useRef } from "react";

interface Dot {
    x: number;
    y: number;
    size: number;
    alpha: number;
    speed: number;
    angle: number;
    radius: number;
    centerX: number;
    centerY: number;
}

const AnimatedDots = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const dots = useRef<Dot[]>([]); // Use a ref for dots to maintain state across renders

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const numberOfDots = 500; // Increased number of dots for a denser effect

        // Resize the canvas to match the window dimensions
        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                // Update dot centers to the new canvas center
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                dots.current.forEach((dot) => {
                    dot.centerX = centerX;
                    dot.centerY = centerY;
                });
            }
        };

        // Track mouse movement
        const handleMouseMove = (event: MouseEvent) => {
            mousePos.current.x = event.clientX;
            mousePos.current.y = event.clientY;
        };

        // Initialize dots array
        const initializeDots = () => {
            for (let i = 0; i < numberOfDots; i++) {
                const dot = createDot();
                dots.current.push(dot); // Push to the current ref
            }
        };

        // Create a new dot
        const createDot = (): Dot => {
            const radius = Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2);
            const angle = Math.random() * Math.PI * 2;
            return {
                x: 0, // Placeholder; will be updated in update method
                y: 0, // Placeholder; will be updated in update method
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.3,
                speed: Math.random() * 0.002 + 0.0005,
                angle,
                radius,
                centerX: window.innerWidth / 2,
                centerY: window.innerHeight / 2,
            };
        };

        // Draw the dot with a glow effect
        const drawDot = (dot: Dot) => {
            if (!context) return;
            context.beginPath();
            context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            context.shadowColor = "rgba(255, 255, 255, 0.5)";
            context.shadowBlur = dot.size * 2;
            context.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
            context.fill();
            context.closePath();
        };

        // Update the position and alpha of the dot for the animation
        const updateDot = (dot: Dot) => {
            // Apply circular movement using angle and radius
            dot.angle += dot.speed;
            dot.x = dot.centerX + dot.radius * Math.cos(dot.angle);
            dot.y = dot.centerY + dot.radius * Math.sin(dot.angle);

            // Attraction to the center: gradually decrease the radius (pull towards the center)
            dot.radius *= 0.995;

            if (dot.radius < 5) {
                dot.radius = Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2);
                dot.angle = Math.random() * Math.PI * 2;
            }

            // Apply mouse magnet effect
            applyMouseAttraction(dot);

            // Draw the updated dot
            drawDot(dot);
        };

        // Attract the dot to the mouse position if it's close enough
        const applyMouseAttraction = (dot: Dot) => {
            const mouseDistance = Math.sqrt(Math.pow(dot.x - mousePos.current.x, 2) + Math.pow(dot.y - mousePos.current.y, 2));

            if (mouseDistance < 100) {
                const attractionStrength = 0.05;
                dot.x += (mousePos.current.x - dot.x) * attractionStrength;
                dot.y += (mousePos.current.y - dot.y) * attractionStrength;
            }
        };

        // Main animation loop
        const animateDots = () => {
            if (!context || !canvas) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            dots.current.forEach((dot) => updateDot(dot));
            requestAnimationFrame(animateDots);
        };

        // Initialize and start the animation
        initializeDots();
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        animateDots();

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []); // No external dependencies, useEffect will run once on mount

    return <canvas ref={canvasRef} className="dots-canvas" />;
};

export default AnimatedDots;
