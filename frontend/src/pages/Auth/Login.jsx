import React, {
    useContext,
    useState,
} from "react";

import AuthLayout from "../../components/layouts/AuthLayout";
import "./Login.css";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import Input from "../../components/Inputs/Input";

import {
    LuWalletCards,
    LuArrowRight,
} from "react-icons/lu";

import {
    FcGoogle,
} from "react-icons/fc";

import {
    FaGithub,
} from "react-icons/fa";

import {
    GoogleLogin,
} from "@react-oauth/google";

import {
    validateEmail,
} from "../../utils/helper.js";

import axiosInstance from "../../utils/axiosInstance.js";

import {
    API_PATHS,
} from "../../utils/apiPaths.js";

import {
    UserContext,
} from "../../context/UserContext.jsx";


const Login = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const [rememberMe, setRememberMe] = useState(false);


    const {
        updateUser,
    } = useContext(UserContext);


    const navigate = useNavigate();


    // =====================================================
    // NORMAL LOGIN
    // =====================================================

    const handleLogin = async (e) => {

        e.preventDefault();


        if (!validateEmail(email)) {
            setError(
                "Please enter a valid email address."
            );

            return;
        }


        if (!password) {
            setError(
                "Please enter the password."
            );

            return;
        }


        setError("");


        try {

            const response =
                await axiosInstance.post(
                    API_PATHS.AUTH.LOGIN,
                    {
                        email,
                        password,
                    }
                );


            const {
                token,
                user,
            } = response.data;


            if (token) {

                localStorage.setItem(
                    "token",
                    token
                );


                if (rememberMe) {

                    localStorage.setItem(
                        "rememberMe",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "rememberMe"
                    );
                }


                updateUser(user);

                navigate("/dashboard");
            }

        } catch (error) {

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Something went wrong. Please try again."
                );
            }
        }
    };


    // =====================================================
    // GOOGLE LOGIN
    // =====================================================

    const handleGoogleSuccess = async (
        credentialResponse
    ) => {

        try {

            setError("");


            const response =
                await axiosInstance.post(
                    API_PATHS.AUTH.GOOGLE,
                    {
                        credential:
                            credentialResponse.credential,
                    }
                );


            const {
                token,
                user,
            } = response.data;


            if (token) {

                localStorage.setItem(
                    "token",
                    token
                );


                updateUser(user);

                navigate("/dashboard");
            }

        } catch (error) {

            console.error(
                "Google Login Error:",
                error
            );


            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Google login failed. Please try again."
                );
            }
        }
    };


    // =====================================================
    // GOOGLE LOGIN ERROR
    // =====================================================

    const handleGoogleError = () => {

        setError(
            "Google login failed. Please try again."
        );
    };


    return (

        <AuthLayout>

            <div className="login-page">


                {/* =================================================
                    ICON
                ================================================== */}

                <div className="login-icon-container">

                    <div className="login-icon">

                        <LuWalletCards
                            size={27}
                        />

                    </div>

                </div>


                {/* =================================================
                    HEADING
                ================================================== */}

                <div className="login-heading">

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to your Expense Tracker account
                    </p>

                </div>


                {/* =================================================
                    FORM
                ================================================== */}

                <form onSubmit={handleLogin}>


                    <Input
                        value={email}
                        onChange={({ target }) =>
                            setEmail(target.value)
                        }
                        label="Email Address"
                        placeholder="avi@gmail.com"
                        type="text"
                    />


                    <Input
                        value={password}
                        onChange={({ target }) =>
                            setPassword(target.value)
                        }
                        label="Password"
                        placeholder="Min 8 Characters"
                        type="password"
                    />


                    {/* =================================================
                        OPTIONS
                    ================================================== */}

                    <div className="login-options">

                        <label className="remember-me">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(
                                        e.target.checked
                                    )
                                }
                            />

                            <span>
                                Remember me
                            </span>

                        </label>


                        <button
                            type="button"
                            className="forgot-password"
                            onClick={() =>
                                setError(
                                    "Password reset functionality is not configured yet."
                                )
                            }
                        >
                            Forgot password?
                        </button>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================== */}

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}


                    {/* =================================================
                        LOGIN BUTTON
                    ================================================== */}

                    <button
                        type="submit"
                        className="login-submit"
                    >

                        <span>
                            Login
                        </span>

                        <LuArrowRight
                            size={20}
                        />

                    </button>


                    {/* =================================================
                        OR
                    ================================================== */}

                    <div className="login-or">

                        <span />

                        <p>
                            OR
                        </p>

                        <span />

                    </div>


                    {/* =================================================
                        SOCIAL BUTTONS
                    ================================================== */}

                    <div className="social-login">


                        {/* =================================================
                            GOOGLE
                        ================================================== */}

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "46px",
                            }}
                        >

                            <button
                                type="button"
                                className="google-custom-button"
                            >

                                <FcGoogle
                                    size={19}
                                />

                                <span>
                                    Google
                                </span>

                            </button>


                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "46px",
                                    opacity: 0,
                                    overflow: "hidden",
                                    zIndex: 2,
                                }}
                            >

                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    useOneTap={false}
                                    width="400"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            GITHUB
                        ================================================== */}

                        <button
                            type="button"
                            onClick={() =>
                                setError(
                                    "GitHub login is not configured yet."
                                )
                            }
                        >

                            <FaGithub
                                size={19}
                            />

                            <span>
                                GitHub
                            </span>

                        </button>


                        {/* =================================================
                            MICROSOFT
                        ================================================== */}

                        <button
                            type="button"
                            onClick={() =>
                                setError(
                                    "Microsoft login is not configured yet."
                                )
                            }
                        >

                            <span className="microsoft-logo">

                                <i />
                                <i />
                                <i />
                                <i />

                            </span>

                            <span>
                                Microsoft
                            </span>

                        </button>


                    </div>


                    {/* =================================================
                        SIGNUP
                    ================================================== */}

                    <p className="login-bottom">

                        Don't have an account?

                        <Link to="/SignUp">
                            Sign Up
                        </Link>

                    </p>


                </form>

            </div>

        </AuthLayout>
    );
};


export default Login;