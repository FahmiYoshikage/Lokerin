import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEdit = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null); // Ubah menjadi null agar tidak langsung merender form kosong

  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${id}`)
      .then(response => response.json())
      .then(data => setJob(data)) // Simpan data dari API ke state
      .catch(error => console.error("Error fetching job:", error));
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
      .then(() => navigate("/admin")) // Kembali ke halaman admin setelah edit
      .catch(error => console.error("Error updating job:", error));
  };

  if (!job) return <p>Loading...</p>; // Pastikan data sudah di-load sebelum menampilkan form

  return (
    <div className="container mt-4">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={job.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input type="text" name="company" className="form-control" value={job.company} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" name="location" className="form-control" value={job.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={job.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" name="image" className="form-control" value={job.image} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Link Pendaftaran (Opsional)</label>
          <input 
            type="url" 
            className="form-control" 
            name="applicationLink" 
            value={job.applicationLink} 
            onChange={handleChange} 
            placeholder="https://example.com/apply"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Poster Pekerjaan</label>
          <input 
            type="url" 
            className="form-control" 
            name="poster" 
            value={job.poster} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin")}>Cancel</button>
      </form>
    </div>
  );
};

export default AdminEdit;
