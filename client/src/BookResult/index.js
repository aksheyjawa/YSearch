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
    console.log("Inside BookResults constructor");
    //this.query = this.props.query;
  }

  render() {
    return (
      <section className="pub_section">
        <div className="pub_details">
          <img className="pub_title_pic" src={root + "/images/JSR.jpg"} />
          <div className="pub_edition">3rd Ed., Paperback</div>
        </div>
        <ListGroup>
        { Helpers.isNotEmpty(this.props.data) 
          && this.props.data.map(result =>
            
            <ListGroupItem 
              key={result.pageNum}
              >
              <h1 className="list_heading">Chapter {result.chapterNum}: {Helpers.highlightTerm(result.title, this.props.query)} - Pg. {result.pageNum}</h1>
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
          ) 
        }
        </ListGroup>
      </section>
    );
  }

}
