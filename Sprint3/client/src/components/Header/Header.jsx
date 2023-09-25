/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/icons/search.svg";
import UploadIcon from "../../assets/icons/upload.svg";

function Header({ defaultPrevent }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="Brainflix logo" />
      </Link>
      <form className="header__form" onSubmit={defaultPrevent}>
        <div className="header__searchWrapper">
          <input
            className="header__search"
            type="search"
            placeholder="Search"
          />
          <img
            className="header__searchImg"
            src={SearchIcon}
            alt="Search icon"
          />
        </div>
        <div className="header__form-bottom">
          <Link to="/upload" className="header__button">
            <img
              className="header__uploadImg"
              src={UploadIcon}
              alt="Upload icon"
            />
            UPLOAD
          </Link>
          <div className="header__mohan"></div>
        </div>
      </form>
    </header>
  );
}

export default Header;
