import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png";

const navbar = (prop) => {
  const crumb = prop.page_name ? " > " + prop.page_name : null;
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        Philadelphia Scientific {crumb}
      </a>
    </nav>
  );
};
export default navbar;
