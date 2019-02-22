import React from "react";
import CatalogTiles from "./CatalogTiles";
import AlbumModal from "./AlbumModal";

class Catalog extends React.Component {
  state = {
    albumModal: false,
    modalData: {}
  };

  toggleAlbumModal = () => {
    this.setState({
      albumModal: !this.state.albumModal
    });
  };

  setModalData = data => {
    this.setState(
      {
        modalData: data
      },
      () => this.toggleAlbumModal()
    );
  };

  render() {
    var data = require("../api/albums.json"); // forward slashes will depend on the file location
    
    return (
      <div>
        <div className="gallery-portfolio">
          <div className="container no-override">
            <div className="row no-gutters">
              {data.map(data => (
                <div
                  key={data.id}
                  className="col-md-6 col-lg-4"
                  style={{ border: "black solid 1px" }}
                >
                  <CatalogTiles
                    data={data}
                    setModalData={data => this.setModalData(data)}
                    toggleAlbumModal={this.toggleAlbumModal}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlbumModal
          modalData={this.state.modalData}
          albumModal={this.state.albumModal}
          toggleAlbumModal={this.toggleAlbumModal}
        />
      </div>
    );
  }
}
export default Catalog;
