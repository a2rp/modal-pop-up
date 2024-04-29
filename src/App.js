import React from "react";
import ModalComp from "./modalComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
    return (
        <div>
            <ModalComp />

            <ToastContainer />
        </div>
    )
}

export default App

