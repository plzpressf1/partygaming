import { WheelStore } from "../../../stores/wheel-store";
import { WheelFilter } from "./wheel-filter";
import { WheelCanvas } from "./wheel-canvas";
import styles from "./wheel.module.scss";

export const Wheel = () => {
    const onCanvasClick = () => {
        WheelStore.start();
    };

    return (
        <div className={styles.wrapper}>
            <WheelFilter/>
            <WheelCanvas onClick={onCanvasClick}/>
        </div>
    );
};
