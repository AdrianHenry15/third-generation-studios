import { useEffect, useRef, useState } from "react";

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
    const fps = 60; // Target frames per second
    const [isClient, setIsClient] = useState(false); // To check if running on the client

    useEffect(() => {
        setIsClient(typeof window !== "undefined"); // Check if window is available (client-side)

        if (!isClient) return; // Do not run the effect if it's server-side

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        const isMobile = window.innerWidth < 768;
        const numberOfDots = isMobile ? 100 : 200;

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
                alpha: Math.random() * 0.5 + 0.3,
                speed: Math.random() * 0.001 + 0.0005,
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
                const attractionStrength = 0.01;
                dot.x += (mousePos.current.x - dot.x) * attractionStrength;
                dot.y += (mousePos.current.y - dot.y) * attractionStrength;
            }
        };

        const animateDots = () => {
            if (!context || !canvas) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            const renderInterval = isMobile ? Math.round(fps / 10) : Math.round(fps / 15);
            if (frameCount.current % renderInterval === 0) {
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
    }, [isClient]); // Ensure window is available (client-side)

    return isClient ? (
        <canvas ref={canvasRef} className="dots-canvas" style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }} />
    ) : null;
};

export default AnimatedDots;
