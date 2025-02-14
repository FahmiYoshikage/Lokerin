// JobModal.js
import React from 'react';

const JobModal = ({ job, onClose }) => {
  // Generate QR code URL - pastikan applicationLink ada sebelum membuat QR
  const qrCodeUrl = job.applicationLink ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(job.applicationLink)}` : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="poster-container">
            <img 
                  src={`http://localhost:5000${job.image}`} 
                  alt={job.title} 
                  className="img-thumbnail w-90"
                />
          </div>
          
          {job.applicationLink && (
            <div className="application-section">
              <h4>Scan untuk Mendaftar:</h4>
              <div className="qr-code">
                <img 
                  src={qrCodeUrl}
                  alt="QR Code untuk pendaftaran"
                  width="200"
                  height="200"
                />
              </div>
              <a 
                href={job.applicationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="apply-button"
              >
                Daftar Sekarang
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobModal;