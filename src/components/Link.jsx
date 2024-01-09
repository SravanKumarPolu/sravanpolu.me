// Link.jsx
import React from "react";
import PropTypes from "prop-types";

const Link = ({ page, setSelectedPage, isActive }) => {
  return (
    <a
      href="#"
      className={`px-3  rounded-sm 
    active:bg-slate-400 focus-within:bg-slate-400 hover:bg-slate-400 ${
      isActive ? "active-link" : " bg-white "
    }`}
      onClick={() => setSelectedPage(page)}>
      {page}
    </a>
  );
};

Link.propTypes = {
  isActive: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
