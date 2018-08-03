import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { input: '' };
    //console.log("Inside Home constructor");
  }

  render() {
    return (
      <div className="homepage main">
        <div className="heading">YSearch</div>
        <div className="sub_heading">Search within teachings of Yogananda</div>

        <SearchBox></SearchBox>

        <div className="search_terms_label">Try these popular searches:</div>
        <div className="search_term_container"> 
          <a className="search_term" href="/results?q=Love">Love</a> 
          <a className="search_term" href="/results?q=Devotion">Devotion</a>
          <a className="search_term" href="/results?q=Kriya">Kriya</a>
          <a className="search_term" href="/results?q=Breathing">Breathing</a>
          <a className="search_term" href="/results?q=God">God</a>
          <a className="search_term" href="/results?q=Marriage">Marriage</a>
        </div>
      </div>
    );
  }
}
