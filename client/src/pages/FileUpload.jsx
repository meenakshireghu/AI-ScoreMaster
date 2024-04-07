import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadModal = ({ isUploading }) => {
  if (!isUploading) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Uploading...</p>
        <FontAwesomeIcon icon={faUpload} spin />
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  isUploading: PropTypes.bool.isRequired,
};

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
  };

  const handleUpload = async () => {
    if (!files.length) {
      alert('Please select at least one file.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
files.forEach((file, index) => {
  formData.append(`files[${index}]`, file);
});


    try {
      await axios.post('http://localhost:5173/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="file-upload-container">
      <UploadModal isUploading={isUploading} />

      <div className="button-container">
        <button className="review-btn" onClick={() => alert("Reviewing answer sheets...")}>REVIEW ANSWER SHEETS</button>
        <button className="view-marksheet-btn">VIEW MARKSHEET</button>
      </div>

      <label htmlFor="file" className="file-label">Choose file(s)</label>
      <p className="file-specification">Images up to 8MB, max 10</p>
      <input type="file" id="file" onChange={handleFileChange} multiple style={{display: 'none'}}/>

      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index}>
            {file.name}
            <button 
              className="close-button" 
              onClick={() => handleRemoveFile(index)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </li>
        ))}
      </ul>

      <div className="upload-instruction">
        <button onClick={handleUpload} className="upload-btn">
          {isUploading ? <FontAwesomeIcon icon={faUpload} spin /> : "UPLOAD"}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;