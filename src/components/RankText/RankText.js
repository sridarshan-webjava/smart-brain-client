import React from "react";
import "./RankText.css";

const RankText = ({ name, rank }) => {
  return (
    <div className="flow-content">
      <h1 className="title">{name} your current rank is</h1>
      <span>#{rank}</span>
    </div>
  );
};

export default RankText;
