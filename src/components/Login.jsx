import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginuser,} from "../assets/signup";
import '../css/Signup.css'
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Must include uppercase, lowercase, and number")
    .required("Password is required"),
  address: Yup.string(),
});

const Login = () => {
  const navigate = useNavigate(); 
  const initialValues = {

    phone: "",

    password: "",
    // address: "",
  };

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const trimmedValues = {
      phone: values.phone.trim(),
      password: values.password.trim(),
    };

    setMessage("");
    setMessageType("");

    const response = await loginuser(trimmedValues);

    console.log("🚀 Full login API response:", response);

  
    const token = response?.token || response?.data?.token;

    if (response?.success && token) {
      localStorage.setItem("token", token);
      console.log("✅ Token saved to localStorage:", token);

      setMessage("Login successful!");
      setMessageType("success");
      resetForm();

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } else {
      setMessage(response?.message || "Login failed.");
      setMessageType("error");
    }
  } catch (error) {
    console.error("❌ Network/login error:", error);
    setMessage("Network error. Please try again.");
    setMessageType("error");
  } finally {
    setSubmitting(false);
  }
};





  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="background-image-section">
          <div className="image-overlay-content">
            <div className="welcome-text">
                  <h2>Welcome Back!</h2>
              <p>Sign in to access your account and continue your journey</p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure & Protected</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Lightning Fast</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Easy to Use</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
                  <h1>Sign In</h1>
              <p>Enter your credentials to access your account</p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="signup-form">
                 
              

                 
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <Field type="tel" name="phone" placeholder="Enter your phone number" />
                    <ErrorMessage name="phone" component="div" className="error-message" />
                  </div>

             
                

              
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" placeholder="Enter your password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  {/* Address */}
                  {/* <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field type="text" name="address" placeholder="Enter your address" />
                    <ErrorMessage name="address" component="div" className="error-message" />
                  </div> */}

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "LOGIN Account..." : "Sign In"}
                  </button>

                  {message && (
                    <div className={`message ${messageType === "success" ? "success-message" : "error-message"}`}>
                    
                    </div>
                  )}
                </Form>
              )}
            </Formik>

            <div className="form-footer">
              <p>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
              <p>
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;