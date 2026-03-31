import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home({ searchTerm }) {
  const [snippets, setSnippets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("https://snapthecode-1.onrender.com/api/snippets/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnippets(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load snippets");
    }
  };

  // 👉 FILTER LOGIC
  const filteredSnippets = snippets.filter((snip) => {
    const text = searchTerm.toLowerCase();
    return (
      snip.title.toLowerCase().includes(text) ||
      snip.description.toLowerCase().includes(text) ||
      snip.language.toLowerCase().includes(text) ||
      snip.code.toLowerCase().includes(text) ||
      snip.tags.some((tag) => tag.toLowerCase().includes(text))
    );
  });

  const handleDelete = (id) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete?</p>
        <button
          onClick={() => {
            deleteSnippet(id); // ✅ pass id here
            closeToast();
          }}
          style={{ marginRight: "10px" }}
        >
          Yes
        </button>

        <button onClick={closeToast}>
          No
        </button>
      </div>
    ),
    {
      autoClose: false,
    }
  );
};

const deleteSnippet = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://snapthecode-1.onrender.com/api/snippets/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Deleted successfully 🗑️",{
       position:"top-left",
      autoClose:1000,
    });

    // optional: refresh UI
    setTimeout(()=>{
      window.location.reload();  
    },1500);
    // or better: update state
  } catch (err) {
    toast.error("Delete failed ❌",{
      position:"top-center",
      autoClose:2000,
    });
  }
};


  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this snippet?")) return;

  //   const token = localStorage.getItem("token");

  //   try {
  //     await axios.delete(`https://snapthecode-1.onrender.com/api/snippets/delete/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     toast.success("Snippet deleted!",{
  //       position:"top-center",
  //       autoClose:2000,
  //     });

  //     fetchSnippets();
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to delete snippet",{
  //       position:"top-center",
  //       autoClose:2000,
  //     });
  //   }
  // };

  // 

  return (
    <div className="container mt-4">
      <h3>📚 Your Snippets</h3>

      <div className="row mt-3">
        {filteredSnippets.map((snip) => (
          <div className="col-md-4 mb-4" key={snip._id}>
            <div className="card p-3 shadow-sm">
              <h5>{snip.title}</h5>
              <p className="text-muted">{snip.description}</p>
              <span className="badge bg-primary me-2">{snip.language}</span>

              <div className="mt-2">
                {snip.tags.map((tag, i) => (
                  <span key={i} className="badge bg-info text-dark me-1">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                className="btn btn-dark mt-3"
                onClick={() => navigate(`/snippet/${snip._id}`)}
              >
                View Code
              </button>

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => navigate(`/edit/${snip._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(snip._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
