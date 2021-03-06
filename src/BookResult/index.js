import React, { Component } from 'react';
import './bookResult.css';
import Helpers from '../helpers.js';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
//const root = "http://localhost:3002";
const root = "";

//var searchQuery = Helpers.getParams().q;

export default class BookResult extends Component {

  constructor() {
    super();
    //console.log("Inside BookResults constructor");
    //this.query = this.props.query;
  }

  render() {
    if (this.props.data.length > 0)
    return (
      <section className="pub_section">
        <div className="pub_details">
          <img className="pub_title_pic" src={root + this.props.img} />
          <div className="pub_edition">{this.props.ed}</div>
        </div>
        <ListGroup>
        { Helpers.isNotEmpty(this.props.data) 
          && this.props.data.map(result =>
            { if(result.score > 0) 
              return(
                <ListGroupItem 
                  key={result.pageNum}
                  >
                  <h1 className="list_heading">Chapter {result.chapterNum}: {Helpers.highlightTerm(result.title, this.props.query)} - Pg. {result.pageNum}   ({result.score})</h1>
                  { Helpers.isNotEmpty(result.contents) 
                    && result.contents.map((section, i) => 
                    {
                      let vdom = Helpers.highlightTerm(section.title, this.props.query, true);
                      if(vdom !== null)
                        return(<div>
                          Section: { vdom } - Pg. { section.pageNum }
                        </div>);
                    }
                    )
                  }
                </ListGroupItem>
              );
            } 
          ) 
        }
        </ListGroup>
      </section>
    );
    else
      return(
          <section className="pub_section">
            <div>No matches found in "{this.props.name}"</div>
          </section>
          );

  }

}
