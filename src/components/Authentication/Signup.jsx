import React from "react";
import style from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate username
    if (!username.match(/^[a-zA-Z0-9]{3,20}$/)) {
      errors.username =
        "Username must be alphanumeric and between 3 and 20 characters.";
      isValid = false;
    }

    // Validate email
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }

    // Validate password
    if (
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ) {
      errors.password =
        "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.";
      isValid = false;
    }

    setErrors(errors);
    setFormValid(isValid);
    return isValid; // Return isValid
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();
      
    if (isValid) {
      try {
        setEmail("");
        setPassword("");
         setUsername("");
        const response = await axios.post("http://localhost:3000/signup", {
          username: username,
          email: email,
          password: password,
        });
        console.log(response.data);
        if (response.data) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
 
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-2 col-sm-12 col-12"></div>

          <div
            className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12"
            id={style.col}
          >
            <h1>Technovole</h1>
            <p>Fill in the Form to Register an Account with Technovole</p>
            <Form onSubmit={handleSignUp}>
              <FloatingLabel
                controlId="floatingUsername"
                label="User Name"
                className="mb-3"
              >
                <Form.Control
                  type="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>

              <button
                className={style.button}
                type="submit"
                disabled={formValid}
              >
                {" "}
                Sign Up{" "}
              </button>
            </Form>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-2 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default Signup;
