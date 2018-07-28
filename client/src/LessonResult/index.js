import React, { Component } from 'react';
import Helpers from '../helpers.js';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
//const root = "http://localhost:3002";
const root = "";



export default class LessonResult extends Component {

  constructor() {
    super();
    console.log("Inside LessonResult constructor");
    //this.query = this.props.query;
  }

  render() {

    let regex = new RegExp(Helpers.escapeString(this.props.query), "i");

    return(
      <section className="pub_section is-lessons">
        <div className="pub_details">
          <img className="pub_title_pic" src={root + "/images/YSSlessons.jpg"} />
        </div>
        <ListGroup>
        { Helpers.isNotEmpty(this.props.data.yss_lessons) 
          && this.props.data.yss_lessons.map(result =>
            { return( result.lessonNum <= 182 &&
                <ListGroupItem 
                  key={result.lessonNum}
                  >
                  <h1 className="list_heading">Lesson {result.lessonNum}: {Helpers.highlightTerm(result.title, this.props.query)}</h1>
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
  }

}