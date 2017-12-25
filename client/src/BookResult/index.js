import React, { Component } from 'react';
import Helpers from '../helpers.js';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

var searchQuery = Helpers.getParams().q;

export default class BookResult extends Component {

  render() {
    return (
      <section>
        Showing results for "{ searchQuery }" from "{ this.props.title }"
        <ListGroup>
        { Helpers.isNotEmpty(this.props.data) 
          && this.props.data.map(result =>
            
                <ListGroupItem 
                  header={`Chapter: ${result.title} - Page ${result.pageNum}`}
                  key={result.pageNum}
                  >
                  <strong>You might be interested in the section(s):</strong>
                  { Helpers.isNotEmpty(result.contents) 
                    && result.contents.map((section, i) => 
                    {
                      return(<div>
                        { Helpers.highlightTerm(section.title, searchQuery) } - <strong>Page { section.pageNum } </strong>
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
