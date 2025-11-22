import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const user = {
    name: "Animesh Ghosh",
    email: "bubay6039@gmail.com",
    bio: "Software Developer passionate about building smart web apps and exploring blockchain.",
    joined: "July 2024",
    avatar:
      "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // sample image
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "25rem" }}>
        <div className="text-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="rounded-circle mb-3 border border-primary"
            style={{ width: "100px", height: "100px" }}
          />
          <h3 className="mb-0">{user.name}</h3>
          <p className="text-muted">{user.email}</p>
        </div>

        <div className="card-body text-center">
          <p className="card-text">{user.bio}</p>
        </div>

        <ul className="list-group list-group-flush text-start">
          <li className="list-group-item">
            <strong>Joined:</strong> {user.joined}
          </li>
        </ul>

        <div className="card-body text-center">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
