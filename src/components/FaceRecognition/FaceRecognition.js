import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="image-container">
      <div className="image">
        <img src={imageURL} alt="" />
        <div
          className="inner-box"
          style={{
            top: box.topRow,
            left: box.leftCol,
            bottom: box.bottomRow,
            right: box.rightCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
