import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadSnippet();
  }, []);

  const loadSnippet = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`https://snapthecode-1.onrender.com/api/snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const snip = res.data;

      setTitle(snip.title);
      setLanguage(snip.language);
      setTags(snip.tags.join(", "));
      setCode(snip.code);
      setDescription(snip.description);
    } catch (err) {
      console.log(err);
      alert("Failed to load snippet");
    }
  };

  const updateSnippet = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://snapthecode-1.onrender.com/api/snippets/update/${id}`,
        {
          title,
          language,
          tags: tags.split(",").map((t) => t.trim()),
          code,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Snippet Updated Successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to update");
    }
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Edit Snippet</h3>

      <form onSubmit={updateSnippet}>
        <input
          className="form-control mt-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Snippet Title"
        />

        <input
          className="form-control mt-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Language (e.g. JavaScript)"
        />

        <input
          className="form-control mt-3"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />

        <textarea
          className="form-control mt-3"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <textarea
          className="form-control mt-3"
          rows="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code here..."
        />

        <button className="btn btn-primary mt-3" type="submit">
          Update Snippet
        </button>
      </form>
    </div>
  );
}

export default EditSnippet;
