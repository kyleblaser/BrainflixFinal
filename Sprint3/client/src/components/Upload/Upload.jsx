/** @format */

import React, { useState } from "react";
import "./Upload.scss";
import thumbnail from "../../assets/Images/Upload-video-preview.jpg";

function Upload(props) {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
  });

  function handleUpload(event) {
    event.preventDefault();

    // Prepare the video object with hardcoded image path
    const newVideo = {
      title: videoData.title,
      description: videoData.description,
      channel: "random channel that doesn't exist",
      image: "https://i.imgur.com/l2Xfgpl.jpg", // Hardcoded image path
    };

    // Make a POST request to your API to save the new video
    fetch("http://localhost:5000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the home page or perform any necessary actions
        alert("Upload complete!");
        props.history.push("/");
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  }

  // Update videoData state when input values change
  function handleInputChange(event) {
    const { name, value } = event.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  }

  return (
    <div className="upload">
      <h1 className="upload__header">Upload Video</h1>
      <div className="inner-load">
        <form className="form" onSubmit={handleUpload}>
          <div className="form-one">
            <div className="form-left">
              <p className="form-left__description">VIDEO THUMBNAIL</p>
              <div className="form-left-img-wrapper">
                <img
                  className="form-left__img"
                  src={thumbnail}
                  alt="Thumbnail of a bicycle view"
                  width="240" // Set a fixed width
                  height="135" // Set a fixed height
                />
              </div>
            </div>
            <div className="form-right">
              <label htmlFor="title" className="form__label">
                TITLE YOUR VIDEO
              </label>
              <input
                className="form__input"
                name="title"
                value={videoData.title}
                onChange={handleInputChange}
                placeholder="Add a title to your video"
              />
              <label htmlFor="description" className="form__label">
                ADD A VIDEO DESCRIPTION
              </label>
              <textarea
                className="form__text-area"
                name="description"
                value={videoData.description}
                onChange={handleInputChange}
                placeholder="Add a description of your video"
              />
            </div>
          </div>
          <div className="btns">
            <button className="btns__publish" type="submit">
              PUBLISH
            </button>
            <button
              className="btns__cancel"
              onClick={(e) => e.preventDefault()}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
