import React, { Component } from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

class Navbar extends Component {
  render() {
    const { links, title } = this.props;

    const linkItems = links.map((link, i) =>
      <li key={ i } className="nav-link">
        <a href={ link.dest }>
          { link.name }
        </a>
      </li>
    );

    return (
      <nav className="nav-main">
        <h1>{ title }</h1>
        <ul className="nav-links">{ linkItems }</ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  links: [],
  title: ''
};

export default Navbar;
