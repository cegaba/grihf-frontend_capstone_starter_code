// src/components/ProfileCard/ProfileForm.js

import React, { useEffect, useState } from "react";
// Note: You will need to create and configure this config file
// For now, you can replace API_URL with your server's localhost URL
// Example: const API_URL = "http://localhost:8181";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css"; // Import the CSS for styling

// Define a Function component called ProfileForm
const ProfileForm = () => {
    const API_URL = "https://random-words-1234.skillsnetwork.labs.com:8181";  // Replace if you have a config file

  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router
  const navigate = useNavigate();
  
  // Use the useEffect hook to fetch user profile data when the component mounts
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Edit Your Profile</h2>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={userDetails.email || ''}
              disabled // Disable the email field
            />
          </label>
          
          {/* --- CODE ADDED FOR EDIT MODE --- */}
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone || ''}
              onChange={handleInputChange}
            />
          </label>
          {/* --- END OF ADDED CODE --- */}

          <button type="submit" className="save-button">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>

          {/* --- CODE ADDED FOR DISPLAY MODE --- */}
          <p> <b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          {/* --- END OF ADDED CODE --- */}

          <button onClick={handleEdit} className="edit-button">Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;