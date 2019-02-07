import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse
} from "reactstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
                                <li style={{ listStyleType: "none" }}>
                                  {track.id} {track.id && " - "} {track.name}
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
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AlbumModal;
