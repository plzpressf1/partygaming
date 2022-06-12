import { useEffect, useRef } from "react";
import styles from "./wheel-canvas.module.scss";
import { WheelStore } from "../../../stores/wheel-store";

interface WheelCanvasProps {
    onClick: () => void;
}

export const WheelCanvas = ({ onClick }: WheelCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d")
            if (ctx) {
                WheelStore.setCanvasCtx(canvasRef.current, ctx);
            }
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
            width={800}
            height={800}
            onClick={onClick}
        />
    );
};
