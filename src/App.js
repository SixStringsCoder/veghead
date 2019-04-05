/*
This is a restaurant search app called VegHead which queries the Yelp API for results.
This app uses React 16, ES 6, and fetch()
created by Steve Hanlon Oct 15, 2017
updated April 2019
*/

import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';

class App extends Component {

    state = {
      businesses: []
    };


  searchYelp = (term, location, sortBy) => {
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({
        businesses: businesses,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1><span className="food-emoji" role="img" aria-label="avocado">🥑</span>
              VegHead
            <span className="food-emoji" role="img" aria-label="taco">🌮</span>
        </h1>
          <SearchBar searchYelp={this.searchYelp}/>
          <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;
