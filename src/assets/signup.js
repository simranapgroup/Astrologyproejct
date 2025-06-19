
export const registerUser = async (userData) => {
  try {

    await new Promise((resolve) => setTimeout(resolve, 1500))

    
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

   
    console.log("Registration successful:", {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: "Registration successful!",
      data: data,
    }
  } catch (error) {
    console.error("Registration error:", error)

  
    return {
      success: false,
      message: error.message || "Registration failed. Please try again.",
    }
  }
}


// export const mockRegisterUser = async (userData) => {

//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   // Simulate random success/failure for testing
//   const isSuccess = Math.random() > 0.2 // 80% success rate

//   if (isSuccess) {
//     console.log("Mock registration successful:", userData)
//     return {
//       success: true,
//       message: "Registration successful! Welcome aboard!",
//       data: {
//         id: Date.now(),
//         fullName: userData.fullName,
//         email: userData.email,
//         phone: userData.phone,
//         address: userData.address,
//         createdAt: new Date().toISOString(),
//       },
//     }
//   } else {
//     return {
//       success: false,
//       message: "Registration failed. Email might already exist.",
//     }
//   }
// }
