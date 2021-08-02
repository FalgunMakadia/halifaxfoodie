import React from 'react';

import PropTypes from 'prop-types';
// import './Upload_Recipe_Files.css';
// import Header from '../Header/Header';
// import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import axios from 'axios';

const UploadRecipe = () => {
  const [uploadFile, setUploadFile] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  // On file upload (click the upload button)
  const onFileUpload = (event) => {
    event.preventDefault();
    
    console.log(text);
    axios({
      method: 'post',
      url: 'https://halifax-foodie-ml-4z2wswh5ea-uc.a.run.app/uploadrecipe',
      data: {
        msg: 'testing',
        text: text,
        // formData: formData,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(response.data.output);
        let responseObj = response.data.output;

        alert(response.data.output);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onFileChange = (event) => {
    // Update the state
    var file = event.target.files[0];
    setSelectedFile(file);
    // selectedFile: event.target.files[0];
  };

  const handleTextBox = (event) => {
    setText(event.target.value);
    // console.log(event.target.value);
    // console.log('text', text);
  };
  return (
    <>
      <div className='uploadFile-screen-container'>
        <div className='uploadFile-screen-content'>
          <div>
            <h3>Enter you text recipe here </h3>
            <form
              style={{ marginTop: '5%', marginRight: '2%' }}
              onSubmit={onFileUpload}
            >
              <input type='file' onChange={onFileChange} />
              <button onClick={onFileUpload}>Predict!</button>
            </form>
          </div>
          <textarea onChange={handleTextBox} value={text}></textarea>
        </div>
      </div>
    </>
  );
};

export default UploadRecipe;