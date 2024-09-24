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
    const dots = useRef<Dot[]>([]);
    const requestRef = useRef<number>(0);
    const frameCount = useRef(0);
    const numberOfDots = 200; // Number of dots
    const fps = 60; // Target frames per second
    const interval = 1000 / fps;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        // Set the canvas height to a fixed value for scrolling
        canvas!.height = window.innerHeight;

        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                dots.current.forEach((dot) => {
                    dot.centerX = centerX;
                    dot.centerY = centerY;
                });
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            mousePos.current.x = event.clientX;
            mousePos.current.y = event.clientY + window.scrollY;
        };

        const initializeDots = () => {
            for (let i = 0; i < numberOfDots; i++) {
                dots.current.push(createDot());
            }
        };

        const createDot = (): Dot => {
            const radius = Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2);
            const angle = Math.random() * Math.PI * 2;
            return {
                x: 0,
                y: 0,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.3, // Alpha can be adjusted for brightness
                speed: Math.random() * 0.001 + 0.0005, // Slower speed
                angle,
                radius,
                centerX: window.innerWidth / 2,
                centerY: window.innerHeight / 2,
            };
        };

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

        const updateDot = (dot: Dot) => {
            dot.angle += dot.speed;
            dot.x = dot.centerX + dot.radius * Math.cos(dot.angle);
            dot.y = dot.centerY + dot.radius * Math.sin(dot.angle);
            dot.radius *= 0.995;

            if (dot.radius < 5) {
                dot.radius = Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2);
                dot.angle = Math.random() * Math.PI * 2;
            }

            applyMouseAttraction(dot);
            drawDot(dot);
        };

        const applyMouseAttraction = (dot: Dot) => {
            const dx = dot.x - mousePos.current.x;
            const dy = dot.y - mousePos.current.y;
            const mouseDistanceSquared = dx * dx + dy * dy;

            if (mouseDistanceSquared < 10000) {
                const attractionStrength = 0.01; // Adjusted for slower attraction
                dot.x += (mousePos.current.x - dot.x) * attractionStrength;
                dot.y += (mousePos.current.y - dot.y) * attractionStrength;
            }
        };

        const animateDots = () => {
            if (!context || !canvas) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.05)"; // Slower fading background
            context.fillRect(0, 0, canvas.width, canvas.height);

            if (frameCount.current % Math.round(fps / 15) === 0) {
                // Render at 15 fps
                dots.current.forEach((dot) => updateDot(dot));
            }
            frameCount.current++;
            requestRef.current = requestAnimationFrame(animateDots);
        };

        initializeDots();
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        animateDots();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="dots-canvas" style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }} />;
};

export default AnimatedDots;
