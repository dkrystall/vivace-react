import React from "react";

const data = require("../api/albums.json"); // forward slashes will depend on the file location
class Carousel extends React.Component {
  state = {
    caro1: 1,
    caro2: 1
  };

  componentDidMount() {
    const data = require("../api/albums.json"); // forward slashes will depend on the file location
    this.randCaro();
    console.log(data);
  }
  randCaro = () => {
    if (this.state.caro1 === this.state.caro2) {
      let rand = Math.floor(Math.random() * (data.length - 2) + 1);
      this.setState({
        caro2: rand
      });
      if (this.state.caro1 === rand) {
        this.randCaro();
      }
    }
  };
  render() {
    const data = require("../api/albums.json");
    return (
      <div
        style={{
          backgroundImage: "url(img/vivacebg.jpg)",
          // backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active" style={{ height: "50vh" }}>
            <div className="carousel-caption d-none d-md-block">
              <img
                className="d-block img-fluid"
                src={data[0].image_url}
                alt="First slide"
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "30vh"
                }}
              />
              <h2>{data[0].cd_name}</h2>
              <p>{data[0].description}</p>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "50vh" }}>
            <div className="carousel-caption d-none d-md-block">
              <img
                className="d-block img-fluid"
                src={data[this.state.caro1].image_url}
                alt="First slide"
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "35vh"
                }}
              />
              <h2>{data[this.state.caro1].cd_name}</h2>
              <p>{data[this.state.caro1].description}</p>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "50vh" }}>
            <div className="carousel-caption d-none d-md-block">
              <img
                className="d-block img-fluid"
                src={data[this.state.caro2].image_url}
                alt="First slide"
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "35vh"
                }}
              />
              <h2>{data[this.state.caro2].cd_name}</h2>
              <p>{data[this.state.caro2].description}</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Carousel;
