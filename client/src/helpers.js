import React, { Component } from 'react';
import * as qs from 'query-string';

export default class Helpers {

  static getParams() {
  	const parsed = qs.parse(window.location.search);
	return parsed;
  }

  static getCurrentLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
      });
    }
    else {
      console.error("Geolocation is not supported by this browser");
    }
  }

  static addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;    
  }

  static removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');    
  }

  static westernize(type) {
    
    type = type.toLowerCase();

    if(type === "mandali" || type === "group" || type === "circle" || type === "circ.")
      return "group";
    else if(type === "kendra" || type === "center")
      return "center";
    else if(type === "retreat" || type === "sadhanalaya")
      return "retreat";
    else if(type === "ashram" || type === "temple")
      return "temple";
    else if(type === "headquarters") //^^ Fix this. Have separate styling for this 
      return "temple"; 
    else if(type === "shop") //^^ Fix this. Have separate styling for this 
      return "retreat";    
    else
      return "unknown";
         
  }

  static isEmpty(variable) {
    if( variable === false )
      return true;    
    if( typeof variable === "undefined" )
      return true;
    if( typeof variable !== "object" && variable === "" )
      return true;
    if( Array.isArray(variable) === true && variable.length === 0 )
      return true;
    return false;
  }

  static isNotEmpty(variable) {
    return !Helpers.isEmpty(variable);
  }

  static codeBookMapping = {
  	"yss_lessons": "YSS Lessons",
  	"jsr": "Journey to Self-Realization",
  	"meq": "Man's Eternal Quest",
  	"dr": "The Divine Romance"
  }

  static escapeString(str) {
     return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };

  static highlightTerm(text, term, returnMatchesOnly) {
    let regex = new RegExp(term, "i");
    let parts = text.split(regex);
    let renderString = [];

    for(let i=0 ; i<parts.length ; i++) {
      if(i > 0) {
        renderString.push( <span className="highlight"> {term} </span> );
      }
      renderString.push( parts[i] );
    }
    if(returnMatchesOnly && parts.length <= 1) //if the term was not found
	    return null;
	else
		return renderString;
  }

}

var H = Helpers;