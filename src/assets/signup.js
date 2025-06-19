import axios from "axios";
export const registerUser = async (userData) => {

  try {
    const { fullName, phone, email, password } = userData;

    if (!fullName || !phone || !email || !password) {
      console.error("Missing required fields:", { fullName, phone, email, password });
      return {
        success: false,
        message: "Please provide all required fields: fullName, phone, email, and password.",
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));


        const apiData = {
      fullName,
      phone,
      email,
      password,
    };


    console.log("Sending registration data:", apiData);


  
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    console.log("Registration successful:", {
      fullName,
      email,
      phone,
      timestamp: new Date().toISOString(),
      userId: data.userId,
    });

    return {
      success: true,
      message: data.message || "Registration successful!",
      userId: data.userId,
    };
  } catch (error) {
  
    const errorMessage = error.response?.data?.message 
      || error.response?.data 
      || error.message 
      || "Registration failed. Please try again.";

    console.error("Registration error:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
};
export const loginuser = async (userData) => {

  try {
    const {  phone,email, password } = userData;

    if ( !phone ||  !password) {
      console.error("Missing required fields:", {  phone,  password });
      return {
        success: false,
        message: "Please provide all required fields:  phone and password.",
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));


        const apiData = {
   
      phone,
   
      password,
    };


    console.log("Sending registration data:", apiData);


  
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    console.log("login successful:", {
     

      phone,
      timestamp: new Date().toISOString(),
      userId: data.userId,
    });

    return {
      success: true,
      message: data.message || "login successful!",
      userId: data.userId,
    };
  } catch (error) {
  
    const errorMessage = error.response?.data?.message 
      || error.response?.data 
      || error.message 
      || "Registration failed. Please try again.";

    console.error("login:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
};
export const verifyOTP = async (otpData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/verify-otp", otpData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("OTP verification error:", error)
    if (error.response) {
      return error.response.data
    }
    throw error
  }
}

export const resendOTP = async (phoneData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/resend-otp", phoneData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Resend OTP error:", error)
    if (error.response) {
      return error.response.data
    }
    throw error
  }
}

