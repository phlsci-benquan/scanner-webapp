import React from "react";

const Footer = (props) => {
  return (
    <div
      className="container"
      style={{ textAlign: "right", marginTop: "10px" }}
    >
      <button
        className="btn btn-outline-secondary"
        onClick={() => props.goHome("")}
      >
        Go Back
      </button>
    </div>
  );
};

export default Footer;
