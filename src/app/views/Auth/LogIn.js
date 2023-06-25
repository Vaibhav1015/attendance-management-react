import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactInput from "../../components/ReactInput";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

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
      const baseURL = "http://192.168.5.85:5000/api/login";
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

  // Password toggle handler
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className=" login-main">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form bg-white ">
        <img
          className="login-logo"
          src="https://www.ewebcore.net/wp-content/uploads/2018/11/cropped-cropped-logo.png"
          alt="Logo"
        />
        <h1 className="text-center">Login</h1>
        {errorMessage && (
          <span className="password-error text-danger">{errorMessage}</span>
        )}
        <div>
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
            icon={
              <span onClick={togglePasswordVisibility}>
                {passwordShown === "password" ? "S" : "H"}
              </span>
            }
            label="Password"
            asterisk="true"
            name="password"
            error={errors.password && <span>{errors.password.message}</span>}
          />
        </div>

        <button
          className="submit-button btn btn-lg text-light btn-block bg-danger"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
