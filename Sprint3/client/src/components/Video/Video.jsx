/** @format */

import React from "react";
import PropTypes from "prop-types";
import "./Video.scss";

function Video({ content }) {
  return (
    <div className="video">
      <div className="video-thumbWrapper">
        <video className="video__img" width="470" height="255" controls>
          <source src={content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

Video.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Video;
