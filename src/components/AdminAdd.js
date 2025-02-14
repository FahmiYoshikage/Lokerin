import React, { useState } from "react";

const AdminPanel = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    image: "",
    date_posted: "",
    applicationLink: "",
    poster: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prevJob => ({
      ...prevJob,
      [name === 'uploadDate' ? 'date_posted' : name]: value
    }));
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
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Upload failed');
    }
    
    const data = await response.json();
    return data.path; // Mengembalikan path file yang diupload
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imagePath = job.image;
      let posterPath = job.poster;
  
      // Upload files if they exist
      if (imageFile) {
        try {
          imagePath = await uploadFile(imageFile);
        } catch (error) {
          throw new Error(`Failed to upload image: ${error.message}`);
        }
      }
      
      if (posterFile) {
        try {
          posterPath = await uploadFile(posterFile);
        } catch (error) {
          throw new Error(`Failed to upload poster: ${error.message}`);
        }
      }
  
      // Update job data with new file paths
      const jobData = {
        ...job,
        image: imagePath,
        poster: posterPath
      };
  
      // Submit job data
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add job posting');
      }
  
      alert("Lowongan berhasil ditambahkan!");
      // Reset form
      setJob({ 
        title: "", 
        company: "", 
        location: "", 
        description: "", 
        image: "",
        date_posted: "",
        applicationLink: "",
        poster: "" 
      });
      setImageFile(null);
      setPosterFile(null);
    } catch (error) {
      console.error("Error:", error);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-4" onClick={() => window.history.back()}>Kembali</button>
      <h2 className="mb-4">Tambah Lowongan Pekerjaan</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Judul Pekerjaan</label>
          <input type="text" className="form-control" name="title" value={job.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Perusahaan</label>
          <input type="text" className="form-control" name="company" value={job.company} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Lokasi</label>
          <input type="text" className="form-control" name="location" value={job.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Upload</label>
          <input 
            type="date" 
            className="form-control" 
            name="date_posted"  
            value={job.date_posted} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea className="form-control" name="description" value={job.description} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Gambar</label>
          <input 
            type="file" 
            className="form-control" 
            name="imageFile" 
            onChange={handleFileChange} 
            accept="image/*"
            required 
          />
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
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Tambah Lowongan</button>
      </form>
    </div>
  );
};

export default AdminPanel;
