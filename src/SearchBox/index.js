import React, { Component } from 'react';
import Helpers from '../helpers.js';
//const root = "http://localhost:3002";

const root = "";



export default class SearchBox extends Component {

  constructor() {
    super();
    console.log("Inside SearchBox constructor");
    //this.query = this.props.query;
  }

  render() {

    return(
      <form method="get" action="/results" >
        <input 
          className="search_box" 
          type="text" 
          placeholder="Enter search term" 
          name="q"
        />
        <input 
          type="submit" 
          value="Search"
          className="search_button"
        />
      </form>
    );
  }

}