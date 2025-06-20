import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser, resendOTP } from "../assets/signup";
import { verifyOTP, } from "../assets/signup";

import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Must include uppercase, lowercase, and number")
    .required("Password is required"),
  address: Yup.string(),
});

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  };

  const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); 
  const [messageType, setMessageType] = useState("");
    const [showOTPInput, setShowOTPInput] = useState(false);
const [otp, setOTP] = useState("");
const [userPhone, setUserPhone] = useState("");
const [isVerifying, setIsVerifying] = useState(false);


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const trimmedValues = {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        address: values.address.trim(),
      };

      setMessage("");
      setMessageType("");

      const response = await registerUser(trimmedValues);
      console.log("API response:", response);

      if (response?.success || response?.message?.toLowerCase().includes("success")) {
        setMessage("Registration successful!");
        setMessageType("success");
        setUserPhone(values.phone);
        setShowOTPInput(true);

        resetForm();
      } else {
        setMessage(response?.message || "Registration failed.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };
 const handleVerifyOtp = async () => {
  if (!otp || otp.length !== 6) {
    setMessage("Please enter a valid 6-digit OTP.");
    setMessageType("error");
    return;
  }

  setIsVerifying(true);

  try {
    const result = await verifyOTP({ phone: userPhone, otp });
    if (result.success) {
      setMessage("OTP verified successfully! Registration complete.");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(result.message || "Invalid or expired OTP.");
      setMessageType("error");
    }
  } catch (error) {
    setMessage("Something went wrong. Please try again later.");
    setMessageType("error");
  } finally {
    setIsVerifying(false);
  }
};
const resendOtp = async () => {
  if (loading) return;

  setLoading(true);
  setMessage("Sending new OTP...");
  setMessageType("info");

  try {
    const result = await resendOTP({ phone: userPhone });
    console.log("result hii-----", result);

    if (result?.success) {
      setMessage("New OTP has been sent to your phone.");
      setMessageType("success");
    } else {
      setMessage(result?.message || "Failed to resend OTP.");
      setMessageType("error");
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="background-image-section">
          <div className="image-overlay-content">
            <div className="welcome-text">
              <h2>Join Our Community!</h2>
              <p>Create your account and unlock amazing features</p>
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
              <h1>Create Account</h1>
              <p>Fill in your details to get started</p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="signup-form">
               
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <Field type="text" name="fullName" placeholder="Enter your full name" />
                    <ErrorMessage name="fullName" component="div" className="error-message" />
                  </div>

              
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <Field type="tel" name="phone" placeholder="Enter your phone number" />
                    <ErrorMessage name="phone" component="div" className="error-message" />
                  </div>

                
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field type="email" name="email" placeholder="Enter your email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

               
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" placeholder="Enter your password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field type="text" name="address" placeholder="Enter your address" />
                    <ErrorMessage name="address" component="div" className="error-message" />
                  </div>

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>

                  {message && (
                    <div className={`message ${messageType === "success" ? "success-message" : "error-message"}`}>
                      {message}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
{showOTPInput && (
              <div className="otp-section">
                <h3>Enter OTP sent to your phone</h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="otp-input"
                  maxLength={6}
                />

                {message && (
                  <div className={`message ${messageType === "success" ? "success-message" : "error-message"}`}>
                    {message}
                  </div>
                )}

             <button
  type="button"
  className="submit-btn"
  onClick={handleVerifyOtp}
  disabled={!otp || otp.length !== 6 || isVerifying}
>
  {isVerifying ? "Verifying..." : "Verify OTP"}
</button>
    <button
      type="button"
      className="resend-btn"
      onClick={resendOtp}
      style={{ marginTop: "10px" }}
    >
      Resend OTP
    </button>
              </div>
            )}

            <div className="form-footer">
              <p>
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;