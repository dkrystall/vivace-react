import React, {Fragment} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledCollapse} from "reactstrap";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import AudioPlayback from "./AudioPlayback";
import ReduxConnectBuilder from "../utils/ReduxConnectBuilder";
import {stopPlayback} from "../redux/actions/audio-playback";

const styles = {
  playback: {
    marginLeft: 8
  }
};


const TrackOutput = ({track}) =>
    <Fragment>
      {track.id} {track.id && " - "} {track.name}
      {track.sampleUrl && <AudioPlayback url={track.sampleUrl} style={styles.playback} id={track.id} showVolumeControl={false}/>}
    </Fragment>;

class AlbumModal extends React.Component {
  state = {
    castArrowStatus: false,
    tracksArrowStatus: false,
    descArrowStatus: false
  };

  toggleTracksArrow = () => {
    this.setState({
      tracksArrowStatus: !this.state.tracksArrowStatus
    });
  };

  descTracksArrow = () => {
    this.setState({
      descArrowStatus: !this.state.descArrowStatus
    });
  };

  toggleCastArrow = () => {
    this.setState({
      castArrowStatus: !this.state.castArrowStatus
    });
  };

  componentWillUnmount() {
    this.props.stopPlayback();
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.albumModal}
          toggle={this.props.toggleAlbumModal}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader toggle={this.props.toggleAlbumModal}>
            {this.props.modalData.cd_name}
          </ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-7">
                  <img
                    src={this.props.modalData.image_url}
                    style={{ width: "100%" }}
                    alt="Album Art"
                  />
                </div>
                <div className="col-md-5">
                  <div>
                    <div>
                      <div id="toggler">
                        <div onClick={this.toggleTracksArrow}>
                          Tracks
                          <span style={{ float: "right" }}>
                            {this.state.tracksArrowStatus ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <React.Fragment>
                        <UncontrolledCollapse toggler="#toggler">
                          {/* {this.props.modalData &&
                              console.log(this.props.modalData)} */}
                          {this.props.modalData.tracks && (
                            <ol>
                              {this.props.modalData.tracks.map(track => (
                                <li style={{ listStyleType: "none" }} key={track.id}>
                                    <TrackOutput track={track}/>
                                </li>
                              ))}
                            </ol>
                          )}
                        </UncontrolledCollapse>
                      </React.Fragment>

                      <div id="toggler2">
                        <div onClick={this.toggleCastArrow}>
                          Cast
                          <span style={{ float: "right" }}>
                            {this.state.castArrowStatus ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </span>
                        </div>
                      </div>

                      <React.Fragment>
                        <UncontrolledCollapse toggler="#toggler2">
                          {/* {this.props.modalData &&
                              console.log(this.props.modalData)} */}
                          {this.props.modalData.cast && (
                            <ul>
                              {this.props.modalData.cast.map(cast => (
                                <li key={cast.name}>
                                  {cast.name} - {cast.role}
                                </li>
                              ))}
                            </ul>
                          )}
                        </UncontrolledCollapse>
                      </React.Fragment>
                      <hr />
                      <div id="toggler3">
                        <div onClick={this.toggleDescArrow}>
                          Description
                          <span style={{ float: "right" }}>
                            {this.state.descArrowStatus ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </span>
                        </div>
                      </div>

                      <React.Fragment>
                        <UncontrolledCollapse toggler="#toggler3">
                          {this.props.modalData.description}
                        </UncontrolledCollapse>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <a href={this.props.modalData.buy_link}>
              <Button>Buy</Button>
            </a>
            <a href={this.props.modalData.itunes}>
              <Button>iTunes</Button>
            </a>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default new ReduxConnectBuilder(AlbumModal).addActionCreator('stopPlayback', stopPlayback).build();
