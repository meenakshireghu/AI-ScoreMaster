import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  let count = 0;  
  const [showPopup, setShowPopup] = useState(false);
  const [examTitle, setExamTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [ansFiles, setAnsFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState(false); // State to track if files are selected

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleExamTitleChange = (event) => {
    setExamTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const totalSelectedFiles = selectedFiles.length + files.length;
    if (totalSelectedFiles <= 10) {
      setSelectedFiles([...selectedFiles, ...files]); // Append new files to existing files
      setFileSelected(true); // Set to true if files are selected
    } else {
      alert('Maximum 10 files allowed');
    }
  };
  
  const handleAnswerChange = (event) => {
    const files = event.target.files;
    const totalSelectedFiles = ansFiles.length + files.length;
    if (totalSelectedFiles <= 10) {
      setAnsFiles([...ansFiles, ...files]); // Append new files to existing files
      setFileSelected(true); // Set to true if files are selected
    } else {
      alert('Maximum 10 files allowed');
    }
  };
  
  const handleRemoveFile = (fileIndex) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== fileIndex)); // Remove selected file
    setAnsFiles(ansFiles.filter((_, index) => index !== fileIndex)); // Remove corresponding answer file
  };

  useEffect(() => {
    // Reset selected files when the popup is opened
    if (showPopup) {
      setSelectedFiles([]);
      setAnsFiles([]);
    }
  }, [showPopup]);

  return (
    <>
      <p className='ps'>My Exam Valuators ({count})</p>
      <div className="container">
        <div className="box" onClick={togglePopup}>
          <div className="circle">
            <span>+</span>
          </div>
          <div className="text">New valuator</div>
        </div>
        {showPopup && (
          <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}><FontAwesomeIcon icon={faX} /></button>
              <h2>Create New Valuator</h2>
              <label htmlFor="examTitle">Exam Title:</label>
              <input
                type="text"
                id="examTitle"
                value={examTitle}
                onChange={handleExamTitleChange}
                required
              />
              <br />
              <div className='file-container'>
                <label htmlFor="selectedFiles">Upload question paper</label>
                <input
                  type="file"
                  id="selectedFiles"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                />
                <br />
                
                <label htmlFor="selectedFiles" className="file-label">
                  Choose File(s)
                </label>
                <div className="file-items">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                     
                      <span>{file.name}</span> {/* Display file name */}
                      <span className="remove-file" onClick={() => handleRemoveFile(index)}><FontAwesomeIcon icon={faCircleXmark} /></span> {/* Remove file icon */}
                    </div>
                  ))}
                </div>
                <span className={selectedFiles.length > 0? 'file-selected' : 'file-hidden'}>
  {selectedFiles.length > 0 && selectedFiles.length + ' File(s) selected'}
</span>
              </div>
              <br />
              <p>Images upto 8MB, max 10</p>
              <br/>
              <div className='file-container'>
              <label htmlFor="ansFiles">Upload answer key/criteria</label>
              <input
                type="file"
                id="ansFiles"
                multiple
                accept="image/*"
                onChange={handleAnswerChange}
                style={{ display: 'none' }}
                required
              />
              <br />
              <label htmlFor="ansFiles" className="file-label">
                Choose File(s)
              </label>
              <div className="file-items">
                {ansFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span> {/* Display file name */}
                    <span className="remove-file" onClick={() => handleRemoveFile(index)}><FontAwesomeIcon icon={faCircleXmark} /></span> {/* Remove file icon */}
                  </div>
                ))}
              </div>
              <span className={ansFiles.length > 0 ? 'file-selected' : 'file-hidden'}>
  {ansFiles.length > 0 && ansFiles.length + ' File(s) selected'}
</span>
              </div>
              <br />
              <p>Images upto 8MB, max 10</p>
            </div>   
            <br />
            <Link to="/file-upload" className='submit'>Create Valuator</Link> {/* Use Link for navigation */}
          </div>
        )}
      </div>
    </>
  );
}
