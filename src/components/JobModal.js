// JobModal.js
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const JobModal = ({ job, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <img 
            src={job.poster} 
            alt={job.title} 
            className="poster-image"
          />
          
          {job.applicationLink && (
            <div className="application-section">
              <h4>Scan untuk Mendaftar:</h4>
              <div className="qr-code">
                <a href={job.applicationLink}></a>
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