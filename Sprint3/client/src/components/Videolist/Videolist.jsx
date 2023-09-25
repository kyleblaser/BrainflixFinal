/** @format */

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Videolist.scss";

function Videolist(props) {
  const { list, match } = props;
  const selectId = match.params.id;
  const isFirstRoute = match.path === "/";

  // Filter the list based on the selected video ID or the first video in the list
  const filteredList = isFirstRoute
    ? list.filter((video) => video.id !== list[0].id)
    : list.filter((video) => video.id !== selectId);

  return (
    <div className="videoList">
      <h5 className="videoList__header">NEXT VIDEO</h5>
      {filteredList.map((video) => (
        <div key={video.id} className="videoList-inner">
          <Link to={`/videos/${video.id}`}>
            <div className="videoList-wrapper">
              <img
                className="videoList__thumbnail"
                src={video.video}
                alt="Thumbnail for the video"
              />
            </div>
          </Link>
          <div className="videoList-inner-block">
            <h4 className="videoList-inner-block__title">{video.title}</h4>
            <p className="videoList-inner-block__channel">{video.channel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

Videolist.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      channel: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    })
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Videolist;
