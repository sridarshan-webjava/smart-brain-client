import React from "react";
import "./ImageLink.css";

const ImageLink = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="input-container">
      <p>{`This Magic Brain will detect faces in your pictures. Give it a try !!`}</p>
      <div className="flex-container inputs">
        <input
          type="text"
          placeholder="Enter an URL"
          onChange={onInputChange}
        />
        <button className="btn" onClick={onButtonSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLink;
