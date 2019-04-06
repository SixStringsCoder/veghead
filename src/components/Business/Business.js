import React from 'react';
import './Business.css';

class Business extends React.Component {

  render() {
    const { id,
            imageSrc,
            name,
            address,
            city,
            state,
            zipCode,
            category,
            rating,
            isclosed,
            reviewCount,
            coordinate_lat,
            coordinate_long } = this.props.business;
    let link = `https://www.google.com/maps/search/?api=1&query=${coordinate_lat},${coordinate_long}&query_place_id=${id}`;
    let link2 = `https://www.google.com/maps/search/?api=1&query=${name}`;
    let reviewLink = `https://api.yelp.com/v3/businesses/${id}/reviews`

    return (
      <div className="Business">
        <div className="image-container">
          <img src={ imageSrc } alt={ name } />
        </div>
        <h2>{ name } <span className={!isclosed ? "isopen"  : "isclosed"}>{ !isclosed ? "Open" : "Closed" }</span></h2>
        <div className="Business-information">
          <div className="Business-address">
            <p><a href={link2} target="_blank" rel="noopener noreferrer">{ address }</a></p>
            <p>{ city }</p>
            <p>{ state } { zipCode }</p>
          </div>
          <div className="Business-reviews">
            <h3>{ category }</h3>
            <h3 className="rating">Rating: { rating }</h3>
            <p>{ reviewCount } reviews</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
