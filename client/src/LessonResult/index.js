import React, { Component } from 'react';
import Helpers from '../helpers.js';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

var searchQuery = Helpers.getParams().q;

export default class LessonResult extends Component {

  render() {

    let regex = new RegExp(Helpers.escapeString(searchQuery), "i");

    return(
      <section>
        Showing results for "{ searchQuery }" from YSS Lessons
        <ListGroup>
        { Helpers.isNotEmpty(this.props.data.yss_lessons) 
          && this.props.data.yss_lessons.map(result =>
            { return( result.lessonNum <= 182 &&
                <ListGroupItem 
                  key={result.lessonNum}
                  >
                  <h1 className="list_heading">Lesson {result.lessonNum}: {Helpers.highlightTerm(result.title, searchQuery)}</h1>
                  { Helpers.isNotEmpty(result.index.page) 
                    && result.index.page.map((ele, i) => 
                    {
                      return(<div>
                        <strong>Page { result.index.page[i] } </strong> talks about "{ Helpers.highlightTerm(result.index.tag[i], searchQuery) }" <br />
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
  }

}