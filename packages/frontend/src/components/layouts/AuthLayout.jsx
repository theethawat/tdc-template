/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import PropTypes from "prop-types";
import { Footer } from "../common/navbar";

export default function AuthLayout({ title, children }) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full'>{children}</div>
      <Footer />
    </>
  );
}

AuthLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

AuthLayout.defaultProps = {
  title: "",
};
