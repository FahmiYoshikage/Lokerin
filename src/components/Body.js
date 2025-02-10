import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Notification from "./Notification";
import Footer from "./Footer";
import JobModal from "./JobModal";

const Body = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div>
      <Navbar data={jobs} setFilteredData={setFilteredJobs} />
      <Notification />
      <div className="lower-container">
        {filteredJobs.map(job => (
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
              <img src={job.image} alt={job.title} className="img-thumbnail w-90"/>
            </div>
          </div>
        ))}
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