import React from "react";
import "./loadingSpinner.css"; // Import CSS for animations
import logo from "./assets/logo512.png"; // Replace with your actual logo path

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <img src={logo} alt="Loading..." className="loading-logo" />
        </div>
    );
};

export default LoadingSpinner;
