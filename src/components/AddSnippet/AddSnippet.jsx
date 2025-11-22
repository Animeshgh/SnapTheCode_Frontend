import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSnippet() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login first!");
      return;
    }

    try {
      await axios.post(
        "https://snapthecode-1.onrender.com/api/snippets/add",
        {
          title,
          language,
          tags: tags.split(",").map((t) => t.trim()),
          description,
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Snippet added successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to add snippet");
    }
  };

  return (
    <div className="container mt-5 p-4 shadow-sm rounded bg-white">
      <h3 className="mb-4 text-center">➕ Add New Snippet</h3>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-bold">Title</label>
          <input 
            type="text"
            className="form-control"
            placeholder="Enter snippet title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Language */}
        <div className="mb-3">
          <label className="form-label fw-bold">Language</label>
          <select
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select a language</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="form-label fw-bold">Tags</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., sorting, loop, array"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Code */}
        <div className="mb-3">
          <label className="form-label fw-bold">Code</label>
          <textarea
            className="form-control"
            rows="8"
            placeholder="Write or paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="text-center">
          <button className="btn btn-success me-2" type="submit">
            💾 Save
          </button>
          <button className="btn btn-danger" type="button">
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSnippet;
