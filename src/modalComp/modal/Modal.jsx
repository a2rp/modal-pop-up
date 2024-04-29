import React from 'react'
import styles from "./styles.module.scss";
import { IoIosCloseCircle } from "react-icons/io";

const Modal = (props) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.close}
                onClick={() => props.setDisplayModal(!props.displayModal)}
            >
                <IoIosCloseCircle className={styles.closeIcon} />
            </div>

            <div className={styles.main}>
                <div className={styles.header}>Modal popup</div>
                <div className={styles.input}>Your input is: {props.inputValue}</div>
                <div className={styles.footer}>a2rp: an Ashish Ranjan presentation</div>
            </div>
        </div>
    )
}

export default Modal

