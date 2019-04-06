import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';

class App extends Component {
    state = {
      businesses: []
    };

    // Load some default choices based on vegetarian restaurants
    componentDidMount() {
      return this.searchYelp(this.term="vegetarian", this.location="Portland", this.sortBy="rating")
    }

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
