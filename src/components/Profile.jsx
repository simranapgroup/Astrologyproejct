import { useState, useEffect } from "react"
import "../css/Profile.css"
import { getProfile } from "../assets/signup"
import axios from "axios"
export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [userData, setUserData] = useState(null)
  const [editedData, setEditedData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  })

useEffect(() => {
  console.log("useEffect called"); 

  const fetchProfile = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await getProfile(); 

      if (!result) {
        throw new Error("Empty response from server");
      }

      if (result.success && result.user) {
        setUserData(result.user);
        setEditedData({
          fullName: result.user.fullName,
          phone: result.user.phone,
          email: result.user.email,
          address: result.user.address,
        });
      } else {
        throw new Error(result.message || "Failed to load user data");
      }
    } catch (error) {
      console.error("❌ Profile fetch error:", error);
      setMessage(
        error.message || "Something went wrong while loading the profile."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);




  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Save changes to the backend
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile")
      }

      // Update userData after successful save
      setUserData((prev) => ({
        ...prev,
        ...editedData,
      }))
      setIsEditing(false)
      setMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      setMessage(`Error: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <p>{message || "Unable to load profile."}</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account information and preferences</p>
        </div>

        {message && (
          <div className={`message ${message.includes("Error") ? "message-error" : "message-success"}`}>
            {message}
          </div>
        )}

        <div className="profile-grid">
          {/* Left Side - User Info */}
          <div className="profile-card">
            <div className="card-header">
              <div className="avatar-container">
                <div className="avatar">{getInitials(userData.fullName)}</div>
              </div>
              <div className="user-name">{userData.fullName}</div>
              <div className="user-email">{userData.email}</div>

              <div className="badges-container">
                <div className={`badge ${userData.isVerified ? "badge-verified" : "badge-unverified"}`}>
                  {userData.isVerified ? "Verified" : "Unverified"}
                </div>
                <div className={`badge ${userData.isActive ? "badge-active" : "badge-inactive"}`}>
                  {userData.isActive ? "Active" : "Inactive"}
                </div>
              </div>
            </div>

            <div className="card-content">
              <div className="wallet-section">
                <div className="wallet-balance">₹{userData.walletBalance}</div>
                <div className="wallet-label">Wallet Balance</div>
              </div>

              <div className="member-since">Member since {formatDate(userData.createdAt)}</div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            <div className="form-actions">
              {!isEditing ? (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              ) : (
                <>
                  <button className="save-button" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </>
              )}
            </div>

            <div className="form-content">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editedData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="form-display">{userData.fullName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-input"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="form-display">{userData.phone}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-input"
                      value={editedData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  ) : (
                    <div className="form-display">{userData.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editedData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="form-display">{userData.address}</div>
                  )}
                </div>
              </div>

              <div className="separator"></div>

              <div className="account-info">
                <div className="info-item">
                  <div className="info-label">User ID</div>
                  <div className="info-value">{userData._id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}