import React, { ReactNode } from "react";
import styles from "./modal.module.scss";

interface ModalProps {
    children: ReactNode;
    onClose?: () => void;
    centered?: boolean;
}

export const Modal = ({ children, onClose, centered }: ModalProps) => {
    const centeredClass = centered ? styles.centered : "";
    return (
        <div
            className={`${styles.fs} ${centeredClass}`}
            style={{ zIndex: 9999 }}
        >
            <div
                className={styles.fs}
                style={{ zIndex: -1 }}
                onClick={onClose}
            />
            {children}
        </div>
    );
}
