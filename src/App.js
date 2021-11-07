import React, { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Wrapper from "./components/Wrapper/Wrapper";
import ImageLink from "./components/ImageLink/ImageLink";
import RankText from "./components/RankText/RankText";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Particles from "react-tsparticles";
import "./App.css";

const particleProperties = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: "window",
    events: {
      resize: true,
    },
  },
  particles: {
    color: {
      value: "#fff",
    },
    links: {
      color: "#fff",
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 900,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 0.5,
    },
  },
  detectRetina: true,
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      currentPage: "signin",
      userDetails: {
        id: 0,
        name: "",
        entries: 0,
      },
    };
  }

  getBoxDimensions = response => {
    const image = document.querySelector(".image-container img");
    const width = image.width;
    const height = image.height;
    const box = response.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(box);
    console.log(
      `Height:${height} Botttom:${height * box.bottom_row} Top:${
        height * box.top_row
      }`
    );
    return {
      topRow: height * box.top_row,
      leftCol: width * box.left_col,
      bottomRow: height - height * box.bottom_row,
      rightCol: width - width * box.right_col,
    };
  };

  setBoxImage = data => {
    this.setState({ box: data });
  };

  loadUserDetails = userData => {
    this.setState({
      userDetails: {
        id: userData.id,
        name: userData.name,
        entries: userData.entries,
      },
    });
  };

  onRouteChange = newRoute => {
    this.setState({ route: newRoute });
    this.setState({ currentPage: newRoute });
    this.setState(Object.assign(this.state.userDetails, { imageURL: "" }));
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://cryptic-dusk-74893.herokuapp.com/imageurl", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then(response => response.json())
      .then(response => {
        this.setBoxImage(this.getBoxDimensions(response));
      })
      .catch(err => console.log(err));
    fetch("https://cryptic-dusk-74893.herokuapp.com/image", {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.userDetails.id,
      }),
    })
      .then(resp => resp.json())
      .then(value =>
        this.setState(Object.assign(this.state.userDetails, { entries: value }))
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          options={particleProperties}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          currentPage={this.state.currentPage}
        />
        {this.state.route === "signin" ? (
          <SignIn
            loadUserDetails={this.loadUserDetails}
            onRouteChange={this.onRouteChange}
          />
        ) : this.state.route === "register" ? (
          <Register
            loadUserDetails={this.loadUserDetails}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Wrapper className="main-section flow-content">
            <RankText
              name={this.state.userDetails.name}
              rank={this.state.userDetails.entries}
            />
            <ImageLink
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </Wrapper>
        )}
      </div>
    );
  }
}

export default App;
