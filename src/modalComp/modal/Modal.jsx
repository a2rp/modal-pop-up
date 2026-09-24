import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { FiCheckCircle, FiX } from "react-icons/fi";

const Modal = ({ inputValue, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className={styles.modalOverlay} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <section className={styles.modalCard} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close modal"><FiX /></button>
                <span className={styles.modalIcon}><FiCheckCircle /></span>
                <span className={styles.eyebrow}>MESSAGE RECEIVED</span>
                <h2 id="modalTitle">Your modal is ready.</h2>
                <p className={styles.modalText}>This is the value passed from the form:</p>
                <div className={styles.messageValue}>{inputValue}</div>
                <button className={styles.modalAction} type="button" onClick={onClose}>Close preview <FiX /></button>
            </section>
        </div>
    );
};

export default Modal;