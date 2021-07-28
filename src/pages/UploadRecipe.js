import React from 'react';

import PropTypes from 'prop-types';
// import './Upload_Recipe_Files.css';
// import Header from '../Header/Header';
// import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import axios from 'axios';

const UploadRecipe = () => {
  const [uploadFile, setUploadFile] = useState();
  const [superHero, setSuperHero] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  // On file upload (click the upload button)
  const onFileUpload = (event) => {
    event.preventDefault();
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('myRecipe', selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);
    console.log(formData);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
    // axios
    //   .post(
    //     'http://localhost:5000/uploadrecipe',
    //     { msg: 'testing' },
    //     {
    //       // paste url here!
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   )
    axios({
      method: 'post',
      url: 'http://localhost:5000/uploadrecipe',
      data: {
        msg: 'testing',
        formData: formData,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        alert(response);
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

  const submitForm = (event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append('superHeroName', superHero);
    dataArray.append('uploadFile', uploadFile);

    axios
      .post('url here', dataArray, {
        // paste url here!
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        alert(error);
      });
  };
  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          {/* <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p> */}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <div className='uploadFile-screen-container'>
        <div className='uploadFile-screen-content'>
          <div>
            <h3>Upload your files here!</h3>
            <form
              style={{ marginTop: '5%', marginRight: '2%' }}
              onSubmit={onFileUpload}
            >
              <input type='file' onChange={onFileChange} />
              <button onClick={onFileUpload}>Upload!</button>
            </form>
          </div>
          {fileData()}
          {/* <iframe
            width='600'
            height='450'
            src='https://datastudio.google.com/embed/reporting/feb6ed1e-88ce-4626-bc02-bf80562c3328/page/DzeWC'
            frameborder='0'
            // style='border:0'
            allowfullscreen
          ></iframe>
          <iframe
            width='600'
            height='450'
            src='https://datastudio.google.com/embed/reporting/364a5d52-4acb-4b78-b3d7-437bb7606a4a/page/c9eWC'
            frameborder='0'
            // style='border:0'
            allowfullscreen
          ></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default UploadRecipe;
