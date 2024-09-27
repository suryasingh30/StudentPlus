import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export const Appbar = () => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token === null || token === "") {
                setFlag(true);
            } else {
                setFlag(false);
            }
        } catch (error) {
            console.error("Error checking token in localStorage:", error);
        }
    }, []);

    return (
        <div className="appbar">
            <Link to="/blogs" className="appbar-logo">
                <img
                    src="/logo.png"
                    alt="StudentPlus"
                    className="appbar-logo-img"
                />
            </Link>
            {flag && (
                <div className="appbar-buttons">
                    <Link to="/signIn">
                        <button
                            type="button"
                            className="appbar-button appbar-signin-button"
                        >
                            Sign In
                        </button>
                    </Link>
                    <Link to="/signUp">
                        <button
                            type="button"
                            className="appbar-button appbar-signup-button"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
            )}

            {!flag && (
                <div className="appbar-notifications">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                    <span>Notifications</span>
                </div>
            )}
        </div>
    );
};
