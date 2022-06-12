import { observable, action, makeObservable } from "mobx";
import { Maybe } from "@pg/types";
import { WheelRenderer } from "./wheel-renderer";

export interface WheelItem {
    id: number,
    name: string;
    weight: number;
    probability: number;
}

class Store {
    readonly renderer = new WheelRenderer();
    private timer: NodeJS.Timer | undefined;

    public items: WheelItem[] = [];
    public angle = 0;
    private currentItem: Maybe<WheelItem> = null;
    private speed = 0;
    private noDecelerationTicks = 0;
    private decelerationRatio = 0;

    constructor() {
        makeObservable(this, {
            setItems: action,
            setAngle: action,
            setCanvasCtx: action,
        });
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    start() {
        this.stop();
        this.speed = 0.09;
        this.decelerationRatio = 0.995;
        this.angle = -10 + Math.floor(Math.random() * 20);
        this.noDecelerationTicks = 400 + Math.floor(Math.random() * 200);
        this.timer = setInterval(() => this.tick(), 10);
    }

    tick() {
        if (!this.items.length) return;

        if (this.noDecelerationTicks === 0) {
            this.speed *= this.decelerationRatio;
            if (this.speed <= 0.001) this.speed = 0;
        }
        else {
            this.noDecelerationTicks--;
        }
        if (this.speed > 0) {
            this.angle -= this.speed;
        }
        this.draw();
        if (this.speed === 0) this.stop();
    }

    setItems(items: WheelItem[]) {
        this.stop();
        this.items = items;
        this.angle = 0;
        this.draw();
    }

    setAngle(angle: number) {
        this.angle = angle;
        this.draw();
    }

    setCanvasCtx(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.renderer.setCanvasCtx(canvas, ctx);
    }

    draw() {
        this.updateCurrentItem();
        this.renderer.draw(this.items, this.currentItem, this.angle);
    }

    updateCurrentItem() {
        const ratio = Math.abs(this.angle % (Math.PI * 2) / (Math.PI * 2));
        let i = 0;
        let sumPiece = 0, prevPiece = 0;
        for (const item of this.items) {
            sumPiece += item.probability;
            if (ratio >= prevPiece && ratio < sumPiece) {
                break;
            }
            prevPiece = item.probability;
            i++;
        }
        this.currentItem = this.items[i];
    }
}

export const WheelStore = new Store();
