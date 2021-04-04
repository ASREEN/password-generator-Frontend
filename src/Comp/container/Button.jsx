import React from "react";
import PropTypes from "prop-types";
const Button = (props) => {
  const { label, className, handleClick } = props;
  return (
    <>
      <button className={className} label={label} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};
Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};
export default Button;
