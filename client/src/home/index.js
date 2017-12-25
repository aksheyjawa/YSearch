import React, { Component } from 'react';
//import './home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleClick() {
    console.log(this.state.input);
    window.location.href = `/results?q=${this.state.input}`;
  }

  render() {
    return (
      <div className="homepage">
        <input 
          className="search_box" 
          type="text" 
          placeholder="Type name of a Topic" 
          onChange={ this.handleChange.bind(this) } />
        <input 
          type="submit" 
          className="btn_default"
          onClick={ this.handleClick.bind(this) } 
        />

      </div>
    );
  }
}
