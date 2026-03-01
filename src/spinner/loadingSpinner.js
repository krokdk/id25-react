import "./loadingSpinner.css";
import logo from "../assets/secular-logo-4585dd-4585dd.png";

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <img src={logo} alt="Loading..." className="loading-logo" />
        </div>
    );
};

export default LoadingSpinner;
