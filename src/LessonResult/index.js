import React, { Component } from 'react';
import Helpers from '../helpers.js';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
//const root = "http://localhost:3002";
const root = "";



export default class LessonResult extends Component {

  constructor() {
    super();
    //console.log("Inside LessonResult constructor");
    //this.query = this.props.query;
    //JSONdb.searchDB('lessons', 'love');
  }

  render() {

    let regex = new RegExp(Helpers.escapeString(this.props.query), "i");
    //console.log(lessonData);
    //JSONdb.searchTag('','');
    console.log("this.props.data.length");
    console.log(this.props.data);
    if (this.props.data.length > 0)
    return(
      
      <section className="pub_section is-lessons">
        <div className="pub_details">
          <img className="pub_title_pic" src={root + "/images/YSSlessons.jpg"} />
        </div>
        <ListGroup>
        { Helpers.isNotEmpty(this.props.data) 
          && this.props.data.map(result =>
            { if(result.score > 0) 
              return( result.num <= 182 &&
                <ListGroupItem 
                  key={result.num}
                  >
                  <h1 className="list_heading">Lesson {result.num}: {Helpers.highlightTerm(result.title, this.props.query)}  ({result.score})</h1>
                  { Helpers.isNotEmpty(result.index) 
                    && result.index.map((indexItem, i) => 
                        indexItem.tags.map((tagItem, j) => 
                        {
                          let vdom = Helpers.highlightTerm(tagItem, this.props.query, true);
                          if(vdom !== null)
                            return(<div> Page {i} talks about "{ vdom }" <br /> </div>);
                        }
                      )
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
          <section className="pub_section is-lessons">
            <div>No matches found in lessons</div>
          </section>
          );
  }

}