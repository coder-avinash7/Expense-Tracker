import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UserContext.jsx";
import uploadImage from "../../utils/uploadImage.js";

import "./SignUp.css";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // =========================
  // HANDLE SIGN UP
  // =========================

  const handleSignUP = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    // Validate name
    if (!fullName.trim()) {
      setError("Please enter your name");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    try {
      // =========================
      // UPLOAD PROFILE IMAGE
      // =========================

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);

        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      // =========================
      // REGISTER USER
      // =========================

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName,
          email,
          password,
          profileImageUrl,
        }
      );

      const { token, user } = response.data;

      // =========================
      // LOGIN AFTER REGISTER
      // =========================

      if (token) {
        localStorage.setItem("token", token);

        updateUser(user);

        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>

      <div className="signup-page">

        {/* =====================================
            SIGN UP CARD
        ===================================== */}

        <div className="signup-card">

          {/* =====================================
              HEADING
          ===================================== */}

          <div className="signup-heading">

            <h3>
              Create an Account
            </h3>

            <p>
              Join us today by entering your details below
            </p>

          </div>


          {/* =====================================
              PROFILE PHOTO
          ===================================== */}

          <div className="signup-profile">

            <ProfilePhotoSelector
              image={profilePic}
              setImage={setProfilePic}
            />

          </div>


          {/* =====================================
              FORM
          ===================================== */}

          <form
            onSubmit={handleSignUP}
            className="signup-form"
          >

            <div className="signup-grid">

              {/* =================================
                  FULL NAME
              ================================= */}

              <div className="signup-field">

                <Input
                  value={fullName}
                  onChange={({ target }) =>
                    setFullName(target.value)
                  }
                  label="Full Name"
                  placeholder="john"
                  type="text"
                />

              </div>


              {/* =================================
                  EMAIL
              ================================= */}

              <div className="signup-field">

                <Input
                  value={email}
                  onChange={({ target }) =>
                    setEmail(target.value)
                  }
                  label="Email Address"
                  placeholder="john@example.com"
                  type="text"
                />

              </div>


              {/* =================================
                  PASSWORD
              ================================= */}

              <div className="signup-password">

                <Input
                  value={password}
                  onChange={({ target }) =>
                    setPassword(target.value)
                  }
                  label="Password"
                  placeholder="Min 8 Characters"
                  type="password"
                />

              </div>

            </div>


            {/* =====================================
                ERROR MESSAGE
            ===================================== */}

            {error && (
              <p className="signup-error">
                {error}
              </p>
            )}


            {/* =====================================
                SIGN UP BUTTON
            ===================================== */}

            <button
              type="submit"
              className="signup-submit"
            >
              SIGN UP
            </button>


            {/* =====================================
                LOGIN LINK
            ===================================== */}

            <p className="signup-bottom">

              Already have an account?

              <Link to="/Login">
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </AuthLayout>
  );
};

export default SignUp;