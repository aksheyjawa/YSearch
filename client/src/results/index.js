import React, { Component } from 'react';
import './results.css';
import Helpers from '../helpers.js';
import { Card, CardTitle, CardSubtitle } from 'rmwc/Card';

export default class Results extends Component {

  state = {results: []}

  componentDidMount() {
    fetch(`/search?q=${Helpers.getParams().q}`)
      .then(res => res.json())
      .then(results => this.setState({ results }));
  }

  render() {
    return (
      <div className="main">
        Showing results for:  
        { " " + Helpers.getParams().q }
        { console.log("Length: " + this.state.results.length) }
        { this.state.results.map(result =>
            { return( result.lessonNum <= 182 &&
                <Card className="result">
                  {console.log(result.lessonNum)}
                  <CardTitle large>
                    { `Lesson title: ${result.lesson[0].title}` }
                  </CardTitle>
                  <CardSubtitle>{ `Matched tag: ${result.tag}` }</CardSubtitle>
                  <CardSubtitle>{ `Lesson: ${result.lessonNum}` }</CardSubtitle>
                  <CardSubtitle>{ `Page: ${result.pageNum[0]}` }</CardSubtitle>
                </Card>);
            }
          ) 
        }
      </div>
    );
  }
}
/*
class ResultBlock extends Component {
  render() {
    return (
      <div className="result">
        <header>{ result.lesson[0].title }</header>
        <div>{ `Tag: ${result.tag}` }</div>
        <div>{ `Lesson: ${result.lessonNum}` }</div>
        <div>{ `Page: ${result.pageNum[0]}` }</div>
      </div>
    );
  }
}*/