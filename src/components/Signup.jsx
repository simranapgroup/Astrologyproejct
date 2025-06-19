"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { registerUser } from "../assets/signup"
import '../css/Signup.css'

const validationSchema = Yup.object({
  fullName: Yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase and number")
    .required("Password is required"),
//   address: Yup.string().min(10, "Address must be at least 10 characters").required("Address is required"),
})

const Signup = () => {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

 
  const initialValues = {
    fullName: "",
    phone: "",
    email: "",
    password: "",
    // address: "",
  }


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setMessage("")
      setMessageType("")

      const response = await registerUser(values)

      if (response.success) {
        setMessage("Registration successful! Welcome aboard!")
        setMessageType("success")
        resetForm()
      } else {
        setMessage(response.message || "Registration failed. Please try again.")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
      setMessageType("error")
    } finally {
      setSubmitting(false)
    }
  }

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
              {({ isSubmitting, errors, touched }) => (
                <Form className="signup-form">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      className={errors.fullName && touched.fullName ? "error-field" : ""}
                    />
                    <ErrorMessage name="fullName" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      className={errors.phone && touched.phone ? "error-field" : ""}
                    />
                    <ErrorMessage name="phone" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={errors.email && touched.email ? "error-field" : ""}
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className={errors.password && touched.password ? "error-field" : ""}
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field
                      as="textarea"
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      rows="3"
                      className={errors.address && touched.address ? "error-field" : ""}
                    />
                    <ErrorMessage name="address" component="div" className="error-message" />
                  </div> */}

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>

                  {/* {message && <div className={`message ${messageType}`}>{message}</div>} */}
                </Form>
              )}
            </Formik>

            <div className="form-footer">
              <p>
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
