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
  validateEmail,
} from "../../utils/helper.js";

import axiosInstance from "../../utils/axiosInstance.js";

import {
  API_PATHS,
} from "../../utils/apiPaths.js";

import {
  UserContext,
} from "../../context/UserContext.jsx";

import "./Login.css";


const Login = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState(null);

  const [rememberMe, setRememberMe] =
    useState(false);


  const {
    updateUser,
  } = useContext(UserContext);


  const navigate =
    useNavigate();


  /* =====================================================
     LOGIN
  ====================================================== */

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


          {/* ERROR */}

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


            <button
              type="button"
              onClick={() =>
                setError(
                  "Google login is not configured yet."
                )
              }
            >

              <FcGoogle size={19} />

              <span>
                Google
              </span>

            </button>


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