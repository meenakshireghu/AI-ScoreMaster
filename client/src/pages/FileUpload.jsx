import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  setanswerSheet,
  uploadanswerSheetStart,
  uploadanswerSheetSuccess,
  uploadanswerSheetFailure,
  clearanswerSheet,
} from '../redux/valuator/answerSheetSlice'; // Adjust the import path as necessary

const UploadModal = ({ isUploading, onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <FontAwesomeIcon icon={faTimes} onClick={!isUploading ? onClose : undefined}
                         className={`close-modal-icon ${isUploading ? 'spinning' : ''}`} />
        <div className="modal-header">
          <h2>Add Answer Sheets</h2>
          <h4>Upload Answer Sheets</h4>
        </div>
        {children}
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  isUploading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function FileUpload() {
  const dispatch = useDispatch();
  const answerSheet = useSelector(state => state.answerSheet.files);
  const isUploading = useSelector(state => state.answerSheet.isUploading);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    const newanswerSheet = Array.from(event.target.files).filter(file => {
      if (file.type !== "image/png") {
        alert("Only PNG files are allowed!");
        return false;
      }
      if (file.size > 8000000) {
        alert("File size must be between 1MB and 10MB!");
        return false;
      }
      return true;
    });

    const allanswerSheet = [...answerSheet, ...newanswerSheet];
    const uniqueanswerSheet = Array.from(new Set(allanswerSheet.map(file => `${file.name}${file.lastModified}`)))
                             .map(name => allanswerSheet.find(file => `${file.name}${file.lastModified}` === name));
    dispatch(setanswerSheet(uniqueanswerSheet));
  };

  const handleUpload = async () => {
    if (!answerSheet.length) {
      alert('Please select at least one file.');
      return;
    }

    dispatch(uploadanswerSheetStart());

    const formData = new FormData();
    answerSheet.forEach((file, index) => {
      formData.append(`${file.name}${index}`, file);
    });

    try {
      await axios.post('http://localhost:5173/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(uploadanswerSheetSuccess());
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      dispatch(uploadanswerSheetFailure(error.message));
      alert('Error uploading files');
    } finally {
      setShowModal(false);
    }
  };

  const removeFile = (index) => {
    const updatedanswerSheet = answerSheet.filter((_, idx) => idx !== index);
    dispatch(setanswerSheet(updatedanswerSheet));
  };

  const closeModalAndClearFiles = () => {
    setShowModal(false);
    dispatch(clearanswerSheet());  // Clear all files on modal close
  };

  return (
    <div className="file-upload-container">
    <span onClick={() => setShowModal(true)} className="open-modal-link">{`Evaluator >> ${evaluatorName}`}</span>
      {showModal && (
        <UploadModal isUploading={isUploading} onClose={closeModalAndClearFiles}>
          <label htmlFor="file" className="file-label">Choose file(s)</label>
          <p className="file-specification">*Images upto 8MB </p>
          <input type="file" id="file" onChange={handleFileChange} multiple style={{display: 'none'}}/>
          {answerSheet.length > 0 && (
            <div className="file-list">
              {answerSheet.map((file, index) => (
                <div key={index} className="selected-file">
                  {file.name}
                  <FontAwesomeIcon icon={faTrash} onClick={() => removeFile(index)} className="remove-file-icon" />
                </div>
              ))}
            </div>
          )}
          <button onClick={handleUpload} className="upload-btn">
            {isUploading ? <FontAwesomeIcon icon={faUpload} spin /> : "UPLOAD"}
          </button>
        </UploadModal>
      )}
    </div>
  );
}

export default FileUpload;
