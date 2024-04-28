import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for making HTTP requests
import {
  createValuatorStart,
  createValuatorSuccess,
  createValuatorFailure,
  uploadQuestionPaperStart,
  uploadQuestionPaperSuccess,
  uploadQuestionPaperFailure,
  uploadAnswerKeyStart,
  uploadAnswerKeySuccess,
  uploadAnswerKeyFailure,
} from '../redux/valuator/valuatorCreationSlice'; // Importing action creators

import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false); 
  const [examTitle, setExamTitle] = useState('');
  const [questionPaper, setQuestionPaper] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [evaluators, setEvaluators] = useState([]);
  const [error, setError] = useState(null);

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
    setQuestionPaper([...questionPaper, ...files]);
    setFileSelected(true);
  };

  const handleAnswerChange = (event) => {
    const files = event.target.files;
    setAnswerKey([...answerKey, ...files]);
    setFileSelected(true);
  };

  const handleRemoveFile = (fileIndex) => {
    setQuestionPaper(questionPaper.filter((_, index) => index !== fileIndex));
    setAnswerKey(answerKey.filter((_, index) => index !== fileIndex));
  };

  const handleCreateValuator = async () => {
    try {
      if (examTitle && questionPaper.length > 0 && answerKey.length > 0) {
        const formData = new FormData();
        formData.append('examTitle', examTitle);
        questionPaper.forEach((file) => formData.append('questionPapers', file));
        answerKey.forEach((file) => formData.append('answerKeys', file));
  
        // Dispatching action to start creating valuator
        dispatch(createValuatorStart());
  
        // Dispatching action to start uploading question papers
        dispatch(uploadQuestionPaperStart());
  
        // Dispatching action to start uploading answer keys
        dispatch(uploadAnswerKeyStart());
  
        // Sending POST request to the server-side endpoint
        const response = await axios.post('http://localhost:5173/api/create-valuator', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Assuming successful response with data
        const newEvaluator = response.data;
  
        // Dispatching action for success in creating valuator
        dispatch(createValuatorSuccess(newEvaluator));
  
        // Dispatching action for success in uploading question papers
        dispatch(uploadQuestionPaperSuccess());
  
        // Dispatching action for success in uploading answer keys
        dispatch(uploadAnswerKeySuccess());
  
        setEvaluators([...evaluators, newEvaluator]);
        setCount(count + 1);
        setShowPopup(false);
      } else {
        throw new Error('Please fill in all inputs');
      }
    } catch (err) {
      // Handle errors, including potential 404 or other server responses
      setError(err.message || 'An error occurred while creating valuator');
      // Dispatch actions for creation/upload failures
      dispatch(createValuatorFailure(err.message));
      dispatch(uploadQuestionPaperFailure(err.message));
      dispatch(uploadAnswerKeyFailure(err.message));
    }
  };
  

  const handleEvaluatorClick = (evaluator) => {
    navigate(`/file-upload/${evaluator.name}`);
  };

  useEffect(() => {
    if (showPopup) {
      setQuestionPaper([]);
      setAnswerKey([]);
      setExamTitle('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
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
        {evaluators.map((evaluator, index) => (
          <div key={index} className="box" onClick={() => handleEvaluatorClick(evaluator)}>
            <div className="text">{evaluator.name}</div>
          </div>
        ))}
        {showPopup && (
          <div className="popup" onClick={handleClosePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={handleClosePopup}><FontAwesomeIcon icon={faX} /></button>
              <h2>Create New Valuator</h2>
              {error && <p className="error">{error}</p>}
              <label htmlFor="examTitle">Exam Title:</label>
              <input
                type="text"
                id="examTitle"
                value={examTitle}
                onChange={handleExamTitleChange}
                placeholder="Enter Exam Title"
                required
              />
              <br />
              <div className='file-container'>
                <label htmlFor="questionPaper">Upload question paper</label>
                <input
                  type="file"
                  id="questionPaper"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                />
                <br />
                <label htmlFor="questionPaper" className="file-label">
                  Choose File(s)
                </label>
                <div className="file-items">
                  {questionPaper.map((file, index) => (
                    <div key={index} className="file-item">
                      <span>{file.name}</span>
                      <span className="remove-file" onClick={() => handleRemoveFile(index)}><FontAwesomeIcon icon={faCircleXmark} /></span>
                    </div>
                  ))}
                </div>
                <span className={questionPaper.length > 0 ? 'file-selected' : 'file-hidden'}>
                  {questionPaper.length > 0 && questionPaper.length + ' File(s) selected'}
                </span>
              </div>
              <br />
              <p>*Images up to 8MB</p>
              <br/>
              <div className='file-container'>
                <label htmlFor="answerKey">Upload answer key/criteria</label>
                <input
                  type="file"
                  id="answerKey"
                  multiple
                  accept="image/*"
                  onChange={handleAnswerChange}
                  style={{ display: 'none' }}
                  required
                />
                <br />
                <label htmlFor="answerKey" className="file-label">
                  Choose File(s)
                </label>
                <div className="file-items">
                  {answerKey.map((file, index) => (
                    <div key={index} className="file-item">
                      <span>{file.name}</span>
                      <span className="remove-file" onClick={() => handleRemoveFile(index)}><FontAwesomeIcon icon={faCircleXmark} /></span>
                    </div>
                  ))}
                </div>
                <span className={answerKey.length > 0 ? 'file-selected' : 'file-hidden'}>
                  {answerKey.length > 0 && answerKey.length + ' File(s) selected'}
                </span>
              </div>
              <br />
              <p>*Images up to 8MB</p>
            </div>
            <br />
            <button className='submit' onClick={handleCreateValuator}>Create Valuator</button>
          </div>
        )}
      </div>
    </>
  );
}
