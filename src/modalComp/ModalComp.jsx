import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "./modal";

const ModalComp = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputValueError, setInputValueError] = useState("Write here something");
    const [displayModal, setDisplayModal] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim().length === 0) {
            setInputValueError("Write here something");
        } else {
            setInputValueError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValueError.length > 0) {
            return toast.error("Form contains errors");
        }

        setDisplayModal(true);

        // console.log(inputValue, "inputvalue");
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.title}>Modal Component</div>

                <form onSubmit={handleSubmit} className={styles.controlsSection}>
                    <TextField
                        value={inputValue}
                        onChange={handleInputChange}
                        fullWidth
                        lable="Write here something"
                        placeholder="Write here something"
                        error={inputValueError.length > 0}
                        helperText={inputValueError.length > 0 ? inputValueError : ""}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.submitButton}
                    >Submit</Button>
                </form>

                {displayModal && <Modal
                    inputValue={inputValue}
                    displayModal={displayModal}
                    setDisplayModal={setDisplayModal}
                />}
            </div>
        </div>
    )
}

export default ModalComp

