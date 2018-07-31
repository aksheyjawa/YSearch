import React, { Component } from 'react';
import './results.css';
import Helpers from '../helpers.js';
import BookResult from '../BookResult';
import LessonResult from '../LessonResult';
import SearchBox from '../SearchBox';

//var this.query = this.props.match.params.id;
//Helpers.getParams().q;

export default class Results extends Component {

  constructor({match}) {
    super();
    this.state = {results: []};
    this.resultsCount = -1;
  }

  componentDidMount() {
    console.log("Inside Results componentDidMount");
    fetch(`/search?q=${this.query}`)
      .then(res => res.json())
      .then(results => {
        //console.log(results);
        this.resultsCount = results.length;
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
    //console.log(sectionedResults);
    return sectionedResults;
  }

  render() {

    const params = new URLSearchParams(this.props.location.search);
    const q = params.get('q');
    this.query = q;

    console.log(this.state.results);

    return (

      <div className="main">
        <SearchBox></SearchBox>

        { this.resultsCount === 0 &&
          <div className="no_results">No results</div>
        }

        { this.resultsCount > 0 &&
          <div>
            <LessonResult data={this.state.results} query={this.query}/>
            <BookResult 
              data={this.state.results.jsr} 
              query={this.query}
              title={`${Helpers.codeBookMapping['jsr']}`}
              img="/images/JSR.jpg"
              ed="3rd Ed., Paperback"
            />

            <BookResult 
              data={this.state.results.dr} 
              query={this.query} 
              title={`${Helpers.codeBookMapping['dr']}`}
              img="/images/DR.jpg"
              ed="3rd Ed., Paperback"
            />
          </div>
        }

        
      </div>
    );
  }
}