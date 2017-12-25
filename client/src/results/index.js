import React, { Component } from 'react';
import './results.css';
import Helpers from '../helpers.js';
import BookResult from '../BookResult';
import LessonResult from '../LessonResult';

var searchQuery = Helpers.getParams().q;

export default class Results extends Component {

  constructor() {
    super();
    this.state = {results: []};
  }

  componentDidMount() {
    fetch(`/search?q=${Helpers.getParams().q}`)
      .then(res => res.json())
      .then(results => {
        console.log(results);
        let sectionedResults= this.restructureResults(results);
        this.setState({ results: sectionedResults });
      });
  }

  restructureResults(allResults) {
    let sectionedResults = {};

    allResults.forEach(function(section) {
      console.log(section._id);
      sectionedResults[section._id] = section.matches;
    });
    console.log(sectionedResults);
    return sectionedResults;
  }

  render() {
    return (

      <div className="main">
        
        <LessonResult data={this.state.results} />

        <BookResult data={this.state.results.jsr} title={`${Helpers.codeBookMapping['jsr']}`}/>

      </div>
    );
  }
}