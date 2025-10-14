import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css"; // Import the CSS for styling

const ProfileForm = () => {
  // IMPORTANT: Replace this with the public URL for your backend server from the Skills Lab "Ports" tab.
const API_URL = "https://labs-mongo-greasy-purring-xylophone.mongo.databases.labs.skills.network:8181"; 

  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

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
              disabled
            />
          </label>
          
          {/* --- This is the logic from the hint for line 114 --- */}
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
          
          <button type="submit" className="save-button">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>

          {/* --- This is the logic from the hint for line 120 --- */}
          <p> <b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>

          <button onClick={handleEdit} className="edit-button">Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;