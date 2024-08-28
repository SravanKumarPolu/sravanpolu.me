// Link.jsx
import React from "react";
import PropTypes from "prop-types";

const Link = ({ page, setSelectedPage }) => {
  return (
    <a
      href="#"
      className={`px-3  rounded-sm 
   
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
