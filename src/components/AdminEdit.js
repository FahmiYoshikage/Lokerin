import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${id}`)
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error("Error fetching job:", error));
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (name === 'imageFile') {
        setImageFile(file);
        setJob(prev => ({ ...prev, image: `/images/${file.name}` }));
      } else if (name === 'posterFile') {
        setPosterFile(file);
        setJob(prev => ({ ...prev, poster: `/images/${file.name}` }));
      }
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (imageFile) {
        const imageUploaded = await uploadFile(imageFile);
        if (!imageUploaded) throw new Error('Image upload failed');
      }
      
      if (posterFile) {
        const posterUploaded = await uploadFile(posterFile);
        if (!posterUploaded) throw new Error('Poster upload failed');
      }

      const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        alert("Lowongan berhasil diupdate!");
        navigate("/admin");
      } else {
        throw new Error('Failed to update job');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengupdate data.");
    }
  };

  if (!job) return <p>Loading...</p>;
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
          <label className="form-label">Gambar</label>
          <input 
            type="file" 
            className="form-control" 
            name="imageFile" 
            onChange={handleFileChange} 
            accept="image/*"
          />
          {job.image && <img src={job.image} alt="Current" className="mt-2" style={{maxWidth: '200px'}} />}
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
          <label className="form-label">Poster Pekerjaan</label>
          <input 
            type="file" 
            className="form-control" 
            name="posterFile" 
            onChange={handleFileChange} 
            accept="image/*"
          />
          {job.poster && <img src={job.poster} alt="Current poster" className="mt-2" style={{maxWidth: '200px'}} />}
        </div>
        <button type="submit" className="btn btn-success">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin")}>Cancel</button>
      </form>
    </div>
  );
};

export default AdminEdit;
