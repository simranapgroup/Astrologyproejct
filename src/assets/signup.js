import axios from "axios";
import { data } from "react-router-dom";
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
    const { phone, password } = userData;

    if (!phone || !password) {
      console.error("Missing required fields:", { phone, password });
      return {
        success: false,
        message: "Phone and password are required",
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const apiData = {
      phone,
      password,
    };

    console.log("Sending login data:", apiData);

    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      apiData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log("✅ login successful:", {
      phone,
      timestamp: new Date().toISOString(),
      userId: data.user?._id,
      token: data.token, // ✅ Log token
    });

    return {
      success: true,
      message: data.message || "Login successful!",
      userId: data.user?._id,
      token: data.token, // ✅ Pass token back
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Login failed. Please try again.";

    console.error("❌ login error:", errorMessage);

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
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Resend OTP error:", {
      message: error.message,
      response: error.response?.data
    });
    return error.response?.data || { success: false, message: "Something went wrong" };
  }
};


export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(" Token from localStorage:", token); 

    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("📡 Sending profile API request...");

    const response = await axios.get("http://localhost:3000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Profile API response:", response.data); // Log result
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Something went wrong",
    };
  }
};



