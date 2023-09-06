import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactInput from "../../components/ReactInput";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import logo from "../../../../src/images/mainLogo.jpeg";
const LogIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  onkeydown = (e) => {
    if (e.key === "Enter") {
      console.log(e, "e");
      onSubmit();
    }
  };

  const onSubmit = async (loginData) => {
    try {
      const baseURL = "https://academic-attendance.onrender.com/api/login";
      // "http://localhost:5000/api/login"

      const response = await axios.post(baseURL, {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        // Store the authentication token in local storage
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        // Redirect the user to a protected page
        navigate("/dashboard", { replace: true });
      } else if (response.data.status !== 200) {
        setErrorMessage("email or password does not match");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [passwordShown, setPasswordShown] = useState(false);

  // show or hide password text
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  return (
    <div className=" login-main">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <img className="login-logo" src={logo} alt="" />
        <h1 className="text-center">Login</h1>
        <h1 className="clgName">समाजसेवक विठ्ठल आंधळे शाळा व महावद्यालय, लिंबोडी.</h1>
        {errorMessage && (
          <span className="password-error text-danger">{errorMessage}</span>
        )}
        <div className="loginInputDiv">
          <ReactInput
            register={{
              ...register("email", {
                required: "Email address cannot be empty",
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/i,
                  message: "Enter valid email address.",
                },
              }),
            }}
            label="Email"
            name="email"
            asterisk="true"
            error={errors.email && <span>{errors.email.message}</span>}
          />
          <ReactInput
            type={passwordShown ? "text" : "password"}
            register={{
              ...register("password", {
                required: "Password cannot be empty",
              }),
            }}
            label="Password"
            asterisk="true"
            name="password"
          />
          <img src={passwordShown ? '/images/view.png' : '/images/invisible.png'}
            alt={passwordShown ? 'Show Password' : 'Hide Password'}
            onClick={togglePassword}
            className='eyeIcons' />
        </div>

        <button
          className="submit-button btn btn-lg text-light btn-block"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
