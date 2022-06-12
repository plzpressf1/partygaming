import { Maybe } from "@pg/types";
import { WheelItem } from "./wheel-store";

const WHEEL_RADIUS = 350;
const WHEEL_OFFSET = 50;
const WHEEL_ANGLE_DELTA = 0;

export class WheelRenderer {
    constructor() {
        this.radius = WHEEL_RADIUS;
        // this.offset = 0;
        this.center = {
            x: WHEEL_RADIUS + WHEEL_OFFSET,
            y: WHEEL_RADIUS + WHEEL_OFFSET,
        };
        // this.angleDelta = WHEEL_ANGLE_DELTA;
        // this.currentItem = {};
        // this.mouseMoveItem = {};
        // this.isRolling = false;
    }

    setCanvasCtx(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw(items: WheelItem[], currentItem: Maybe<WheelItem>, angle = 0) {
        if (items.length === 0) return;
        const ctx = this.ctx;
        if (!this.canvas || !ctx) return;

        const colors = ["blue", "red", "green", "orange", "gray", "yellow"];
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw items
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        let index = 0;
        let currentAngle = angle;
        let redrawSector = false;
        for (const item of items) {
            ctx.fillStyle = colors[index++ % colors.length];

            const arcSector = Math.PI * (2 * item.probability);
            const startAngle = currentAngle - this.offset;
            const endAngle = currentAngle + arcSector - this.offset;

            // mouse move slices
            // if (mouseMoveCoords) {
            //     let x = mouseMoveCoords.x - mouseMoveCoords.width / 2;
            //     let y = -mouseMoveCoords.y + mouseMoveCoords.height / 2;
            //     const length = Math.sqrt(x * x + y * y);
            //     const realRadius = this.radius * (mouseMoveCoords.width / CANVAS_SIZE);
            //     if (length && length <= realRadius) {
            //         x /= length;
            //         y /= length;
            //         let mouseAngle = y > 0 ? Math.PI * 2 - Math.acos(x) : Math.acos(x);
            //         let startAngleAdjusted = this.adjustAngle(startAngle);
            //         let endAngleAdjusted = this.adjustAngle(endAngle);
            //         if (endAngleAdjusted < startAngleAdjusted) endAngleAdjusted += Math.PI * 2;
            //         if (
            //             (mouseAngle >= startAngleAdjusted && mouseAngle < endAngleAdjusted) ||
            //             (mouseAngle + Math.PI * 2 >= startAngleAdjusted && mouseAngle + Math.PI * 2 < endAngleAdjusted)
            //         ) {
            //             this.mouseMoveItem = item;
            //             redrawSector = {
            //                 startAngle, endAngle, currentAngle, item, fillStyle: ctx.fillStyle
            //             };
            //         }
            //     }
            // }

            ctx.beginPath();
            ctx.moveTo(this.center.x, this.center.y);
            ctx.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.fillStyle = "black";
            ctx.font = `26px serif`;
            ctx.translate(this.center.x, this.center.y);
            ctx.rotate(currentAngle + item.probability * Math.PI);
            ctx.translate(20, -3);
            ctx.textAlign = "center";
            ctx.fillText(item.name, this.radius / 2, 12);
            ctx.restore();

            currentAngle += arcSector;
        }

        // draw wheel border
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.arc(this.center.x, this.center.y, this.radius + 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.arc(this.center.x, this.center.y, this.radius + 6, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();

        // draw pointer
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.moveTo(this.center.x + this.radius + 20, this.center.y - 10);
        ctx.lineTo(this.center.x + this.radius + 20, this.center.y + 10);
        ctx.lineTo(this.center.x + this.radius - 40, this.center.y);
        ctx.lineTo(this.center.x + this.radius + 20, this.center.y - 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // draw pointed item text
        if (currentItem && currentItem.name) {
            const fontSize = 36;
            ctx.font = `${fontSize}px serif`;
            ctx.rect(this.center.x - this.radius / 2 - 5, this.center.y - 40 - fontSize, this.radius, fontSize + 10);
            ctx.stroke();
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = "black";
            ctx.fillText(currentItem.name, this.center.x - this.radius / 2, this.center.y - 40);
        }

        // draw spin circle
        if (true) {
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "black";
            ctx.arc(this.center.x, this.center.y, 25, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            const fontSize = 16;
            ctx.font = `${fontSize}px serif`;
            ctx.fillStyle = "red";
            ctx.fillText("Spin!", this.center.x - 17, this.center.y + 5);
        }
    }


    private canvas: Maybe<HTMLCanvasElement> = null;
    private ctx: Maybe<CanvasRenderingContext2D> = null;
    private center: { x: number, y: number };
    private readonly radius: number;
    private readonly offset = 0;
}
