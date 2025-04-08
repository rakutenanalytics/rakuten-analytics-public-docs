import React from 'react';
import PropTypes from 'prop-types';
import Link from '@docusaurus/Link';
import './components.css';

const Card = ({ title, imageUrl, description, to }) => {
  return (
  <a href={to} className="card">
    <div>
        <img src={imageUrl} alt={`${title} logo`} className="card__image" />
        <div className="card__body">
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
        </div>
    </div>
  </a>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Card;