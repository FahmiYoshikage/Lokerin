import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Hapus Pekerjaan?",
      text: `Apakah Anda yakin ingin menghapus pekerjaan "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/jobs/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            setJobs(jobs.filter((job) => job.id !== id));
            Swal.fire("Terhapus!", "Pekerjaan telah dihapus.", "success");
          })
          .catch((error) => console.error("Error deleting job:", error));
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>
      <Link to="/admin/add" className="btn btn-primary mb-3">Tambah Job</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Perusahaan</th>
            <th>Lokasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>
                <Link to={`/admin/edit/${job.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(job.id, job.title)} className="btn btn-danger btn-sm">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
