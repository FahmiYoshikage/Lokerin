import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Notification from "./Notification";
import Footer from "./Footer";
import JobModal from "./JobModal";

const Body = () => {
  const [jobs, setJobs] = useState([]);  // Initialize sebagai array kosong
  const [filteredJobs, setFilteredJobs] = useState([]); // Initialize sebagai array kosong
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambah state loading
  const [error, setError] = useState(null); // Tambah state error

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/jobs")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {  // Pastikan data adalah array
          setJobs(data);
          setFilteredJobs(data);
        } else {
          setJobs([]);
          setFilteredJobs([]);
          console.error("Data is not an array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setError(error.message);
        setJobs([]);
        setFilteredJobs([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar data={jobs} setFilteredData={setFilteredJobs} />
      <Notification />
      <div className="lower-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : filteredJobs.length === 0 ? (
          <div>No jobs found</div>
        ) : (
          filteredJobs.map(job => (
            <div className="post" key={job.id}>
              <div>
                <h2 className="post-title">{job.title}</h2>
                <div className="post-meta">
                  <strong>{job.company}</strong> - {job.date_posted}
                </div>
                <div className="post-content">{job.description}</div>
                <button
                  className="view-details-btn"
                  onClick={() => setSelectedJob(job)}
                >
                  Lihat Detail →
                </button>
              </div>
              <div>
              <img 
                  src={`http://localhost:5000${job.image}`} 
                  alt={job.title} 
                  className="img-thumbnail w-90"
                />

              </div>
            </div>
          ))
        )}
      </div>
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
      <Footer />
    </div>
  );
};

export default Body;