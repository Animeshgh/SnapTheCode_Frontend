import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SnippetView() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    fetchSnippet();
  }, []);

  const fetchSnippet = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://snapthecode-1.onrender.com/api/snippets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnippet(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load snippet");
    }
  };

  if (!snippet) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <h2>{snippet.title}</h2>
      <p className="text-muted">{snippet.description}</p>

      <span className="badge bg-primary">{snippet.language}</span>

      <h4 className="mt-4">Tags:</h4>
      {snippet.tags.map((tag, i) => (
        <span key={i} className="badge bg-info text-dark me-1">
          #{tag}
        </span>
      ))}

      <h4 className="mt-4">Code:</h4>
      <pre className="bg-dark text-white p-3 rounded">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export default SnippetView;
