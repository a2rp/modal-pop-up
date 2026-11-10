import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { FiCheckCircle, FiX } from "react-icons/fi";

const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({ inputValue, onClose, backgroundElement }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return undefined;

        const previousActiveElement = document.activeElement;
        const previousBodyOverflow = document.body.style.overflow;
        const previousInert = backgroundElement?.inert ?? false;
        const previousAriaHidden =
            backgroundElement?.getAttribute("aria-hidden") ?? null;

        dialog.querySelector("button")?.focus();
        if (backgroundElement) {
            backgroundElement.inert = true;
            backgroundElement.setAttribute("aria-hidden", "true");
        }
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = Array.from(
                dialog.querySelectorAll(focusableSelector),
            ).filter((element) => !element.hidden);
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (!firstElement || !lastElement) {
                event.preventDefault();
                dialog.focus();
                return;
            }

            if (!dialog.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? lastElement : firstElement).focus();
            } else if (
                event.shiftKey &&
                document.activeElement === firstElement
            ) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousBodyOverflow;
            if (backgroundElement) {
                backgroundElement.inert = previousInert;
                if (previousAriaHidden === null) {
                    backgroundElement.removeAttribute("aria-hidden");
                } else {
                    backgroundElement.setAttribute("aria-hidden", previousAriaHidden);
                }
            }
            if (
                previousActiveElement instanceof HTMLElement &&
                previousActiveElement.isConnected
            ) {
                previousActiveElement.focus();
            }
        };
    }, [backgroundElement, onClose]);

    return createPortal(
        <div
            className={styles.modalOverlay}
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                ref={dialogRef}
                className={styles.modalCard}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
                tabIndex={-1}
            >
                <button
                    className={styles.closeButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <FiX />
                </button>
                <span className={styles.modalIcon}>
                    <FiCheckCircle />
                </span>
                <span className={styles.eyebrow}>PREVIEW READY</span>
                <h2 id="modalTitle">Your message preview is ready.</h2>
                <p className={styles.modalText} id="modalDescription">
                    This value stays in your browser and was not sent to a service.
                </p>
                <div className={styles.messageValue}>{inputValue}</div>
                <button
                    className={styles.modalAction}
                    type="button"
                    onClick={onClose}
                >
                    Close preview <FiX />
                </button>
            </section>
        </div>,
        document.body,
    );
};

export default Modal;
