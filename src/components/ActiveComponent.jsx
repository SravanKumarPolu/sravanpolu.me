import React from "react";
import PropTypes from "prop-types";

const Link = ({ isActive, page, setSelectedPage }) => {
  return (
    <a
      href="#"
      className={`px-3 bg-white bg-opacity-50 rounded-sm 
      active:bg-slate-400 focus-within:bg-slate-400 hover:bg-slate-400 ${
        isActive ? "active-link" : ""
      }`}>
      {page}
    </a>
  );
};

Link.propTypes = {
  isActive: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  setSelectedPage: PropTypes.func.isRequired,
};

export default Link;
