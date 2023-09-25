/** @format */

import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../utility/api";
import "./MainPage.scss";
import Video from "../Video/Video";
import VideoInfo from "../VideoInfo/VideoInfo";
import Comments from "../Comments/Comments";
import Videolist from "../Videolist/Videolist";

class MainPage extends Component {
  state = {
    selectedData: null,
    data: null,
    selectedId: null,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`${URL}/videos`);
      const { data } = response;
      const { id } = this.props.match.params;
      const selectedId = this.props.match.path === "/" ? data[0].id : id;

      this.setState({ data, selectedId });
      await this.innerAxiosGet(selectedId);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;

    if (id !== prevId) {
      await this.innerAxiosGet(id);
    }
  }

  innerAxiosGet = async (id) => {
    try {
      const response = await axios.get(`${URL}/videos/${id}`);
      this.setState({ selectedData: response.data });
    } catch (error) {
      console.log("Error fetching video data:", error);
    }
  };

  render() {
    const { loading, error, data, selectedData } = this.state;

    if (loading) {
      return <main className="load-screen">Loading...</main>;
    }

    if (error) {
      return <main className="error-screen">Error loading data.</main>;
    }

    if (!selectedData || !selectedData.video) {
      return (
        <main className="error-screen">
          Selected video data is missing or incomplete.
        </main>
      );
    }

    return (
      <div className="App">
        <Video content={selectedData.video} />
        <div className="half-page">
          <div className="half-page-left">
            <VideoInfo content={selectedData} />
            <Comments
              selectedVideo={selectedData}
              {...this.props}
              vidArray={data}
            />
          </div>
          <Videolist list={data} {...this.props} />
        </div>
      </div>
    );
  }
}

export default MainPage;
