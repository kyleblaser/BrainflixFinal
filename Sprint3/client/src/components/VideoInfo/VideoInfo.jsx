/** @format */

import React from "react";
import PropTypes from "prop-types";
import Viewicon from "../../assets/icons/views.svg";
import Likeicon from "../../assets/icons/likes.svg";
import "./VideoInfo.scss";

function dateGet(dateVar) {
  const month = `0${dateVar.getMonth() + 1}`.slice(-2);
  const day = `0${dateVar.getDate()}`.slice(-2);
  const year = dateVar.getFullYear();
  return `${month}/${day}/${year}`;
}

function VideoInfo({ content }) {
  return (
    <div className="info">
      <h1 className="info-title">{content.title}</h1>
      <div className="info-divider">
        <div className="info-user">
          <p className="info-user-data">By {content.channel}</p>
          <p className="info-user-data-two">
            {dateGet(new Date(Number(content.timestamp)))}
          </p>
        </div>
        <div className="info-social">
          <p className="info-social-viewcount">
            <img
              className="info-social-view-icon"
              src={Viewicon}
              alt="The View count icon"
            />
            {content.views}
          </p>
          <p className="info-social-likecount">
            <img
              className="info-social-like-icon"
              src={Likeicon}
              alt="The Like count icon"
            />
            {content.likes}
          </p>
        </div>
      </div>
      <p className="info-description">{content.description}</p>
    </div>
  );
}

VideoInfo.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired, 
    views: PropTypes.string.isRequired, 
    likes: PropTypes.string.isRequired, 
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoInfo;
